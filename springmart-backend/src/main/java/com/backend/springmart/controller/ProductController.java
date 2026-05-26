package com.backend.springmart.controller;

import com.backend.springmart.dto.ProductRequest;
import com.backend.springmart.model.Product;
import com.backend.springmart.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;

/**
 * REST Controller exposing product management APIs.
 * Supports paginated listings, detail lookups, binary image streaming, full-text searches, and multipart CRUD operations.
 */
@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController
{

    private final ProductService service;

    /**
     * Initializes the controller with the required business logic service.
     *
     * @param service the ProductService layer
     */
    public ProductController(ProductService service)
    {
        this.service = service;
    }

    /**
     * Health check endpoint.
     *
     * @return plain-text greeting message
     */
    @GetMapping("/")
    public ResponseEntity<String> hello()
    {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }

    /**
     * Retrieves a paginated list of all products.
     *
     * @param page zero-based page index (defaults to 0)
     * @param size number of records per page (defaults to 10)
     * @return 200 OK with the page of products, or 204 No Content if empty
     */
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size)
    {
        Page<Product> products = service.getAllProducts(PageRequest.of(page, size));
        if (products.isEmpty())
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * Retrieves a single product by its database ID.
     *
     * @param id database ID of the product
     * @return 200 OK with the product details, or 404 Not Found
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id)
    {
        Product product = service.getProductById(id);
        if (product == null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    /**
     * Streams the binary image data for a product with the corresponding content-type header.
     *
     * @param id database ID of the product
     * @return 200 OK containing raw image bytes, or 404 Not Found
     */
    @GetMapping("/products/image/{id}")
    public ResponseEntity<byte[]> getProductImage(@PathVariable int id)
    {
        Product product = service.getProductById(id);
        if (product == null || product.getImageData() == null)
        {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header("Content-Type", product.getImageType())
                .body(product.getImageData());
    }

    /**
     * Searches products using a keyword matched against name, description, brand, or category.
     *
     * @param keyword the search term
     * @return 200 OK with the matched products list, or 204 No Content if no results match
     */
    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword)
    {
        List<Product> products = service.searchProducts(keyword);
        if (products.isEmpty())
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * Creates a new product using a multipart/form-data request containing request JSON metadata and an optional image file.
     *
     * @param product serialized DTO containing field metadata
     * @param imageFile raw binary payload of the product image
     * @return 201 Created with the Location header and persisted product payload, 400 Bad Request, or 500 Internal Server Error
     */
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@Valid @RequestPart ProductRequest product,
            @RequestPart(required = false) MultipartFile imageFile)
    {
        try
        {
            Product createdProduct = service.addOrUpdateProduct(toProduct(product), imageFile);
            return ResponseEntity.created(URI.create("/api/products/" + createdProduct.getId()))
                    .body(createdProduct);
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Updates an existing product using a multipart/form-data PUT request.
     * Integrates partial update merging rules prior to persisting changes.
     *
     * @param id database ID of the target product
     * @param product serialized update parameters
     * @param imageFile optional new binary image payload
     * @return 200 OK with updated entity, 404 Not Found, 400 Bad Request, or 500 Internal Server Error
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<Object> updateProduct(@PathVariable int id, @RequestPart ProductRequest product,
            @RequestPart(required = false) MultipartFile imageFile)
    {
        try
        {
            Product existingProduct = service.getProductById(id);
            if (existingProduct == null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            Product updatedProduct = service.addOrUpdateProduct(mergeProduct(existingProduct, product, id), imageFile);
            return ResponseEntity.ok(updatedProduct);
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    /**
     * Deletes a product from the database.
     *
     * @param id database ID of the product to delete
     * @return 240 No Content on success, or 404 Not Found if missing
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id)
    {
        Product product = service.getProductById(id);
        if (product == null)
        {
            return ResponseEntity.notFound().build();
        }
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Maps an incoming ProductRequest DTO to a persistent Product JPA Entity.
     *
     * @param request the source data transfer object
     * @return initialized Product Entity
     */
    private Product toProduct(ProductRequest request)
    {
        Product product = new Product();
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());
        if (request.getQuantity() != null)
        {
            product.setQuantity(request.getQuantity());
        }
        product.setBrand(request.getBrand());
        if (request.getInStock() != null)
        {
            product.setInStock(request.getInStock());
        }
        product.setReleaseDate(request.getReleaseDate());
        return product;
    }

    /**
     * Merges update parameters from a ProductRequest DTO into an existing Product Entity.
     * Non-null fields are applied over the existing instance.
     *
     * @param existingProduct the loaded Entity from persistence
     * @param request the source data transfer object
     * @param id target product ID
     * @return the merged Product Entity
     */
    private Product mergeProduct(Product existingProduct, ProductRequest request, int id)
    {
        existingProduct.setId(id);
        if (request.getName() != null)
        {
            existingProduct.setName(request.getName());
        }
        if (request.getPrice() != null)
        {
            existingProduct.setPrice(request.getPrice());
        }
        if (request.getDescription() != null)
        {
            existingProduct.setDescription(request.getDescription());
        }
        if (request.getCategory() != null)
        {
            existingProduct.setCategory(request.getCategory());
        }
        if (request.getQuantity() != null)
        {
            existingProduct.setQuantity(request.getQuantity());
        }
        if (request.getBrand() != null)
        {
            existingProduct.setBrand(request.getBrand());
        }
        if (request.getInStock() != null)
        {
            existingProduct.setInStock(request.getInStock());
        }
        if (request.getReleaseDate() != null)
        {
            existingProduct.setReleaseDate(request.getReleaseDate());
        }
        return existingProduct;
    }
}
