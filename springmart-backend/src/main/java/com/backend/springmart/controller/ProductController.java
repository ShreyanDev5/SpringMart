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
 * REST Controller exposing the core Product Catalog APIs.
 * 
 * Implements a RESTful interface featuring:
 * - Paginated resource listings (minimizes server memory consumption and network payloads).
 * - Multi-attribute case-insensitive search queries.
 * - Binary stream retrieval for product images (served directly with matching MIME content-type headers).
 * - Full CRUD capabilities handling multipart form data (integrating JSON DTO details and optional image files).
 */
@RestController
@CrossOrigin // Enables Cross-Origin Resource Sharing (CORS) to allow frontend clients from other domains/ports (e.g., localhost:3000) to fetch APIs.
@RequestMapping("/api")
public class ProductController
{

    private final ProductService service;

    /**
     * Dependency injection via constructor. 
     * Constructor injection is preferred over field injection (@Autowired on fields) because it:
     * 1. Simplifies unit testing by enabling simple mock injection.
     * 2. Enforces required dependencies at compile time (prevents NullPointerExceptions during runtime).
     * 3. Promotes class immutability by permitting 'final' declarations.
     *
     * @param service the ProductService layer handling business rules
     */
    public ProductController(ProductService service)
    {
        this.service = service;
    }

    /**
     * Health check endpoint.
     * Often used by load balancers, container orchestration tools (e.g., Kubernetes), or hosting environments (e.g., Render)
     * to check if the JVM and embedded server are alive and routing traffic.
     *
     * @return 200 OK containing a plain-text status greeting
     */
    @GetMapping("/")
    public ResponseEntity<String> hello()
    {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }

    /**
     * Retrieves a paginated slice of all products.
     * Pagination is heavily recommended in production catalogs to avoid pulling thousands of rows into server memory.
     *
     * @param page zero-based page index, defaulting to 0 (the first page)
     * @param size maximum size of the page slice, defaulting to 10 products
     * @return 200 OK with the page details, or 204 No Content if no items exist
     */
    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getProducts(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size)
    {
        Page<Product> products = service.getAllProducts(PageRequest.of(page, size));
        if (products.isEmpty())
        {
            // Returning 204 No Content is more semantically accurate than an empty 200 OK list for search/filter flows.
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    /**
     * Retrieves a single product by its database primary key.
     *
     * @param id database ID of the product
     * @return 200 OK with the product details, or 404 Not Found if no match exists
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
     * Streams raw binary image bytes directly to the client.
     * This decouples image fetching from standard JSON details and uses the stored MIME type 
     * (e.g., image/webp, image/png) so browsers render the image natively instead of downloading it as a attachment.
     *
     * @param id database ID of the product
     * @return 200 OK containing the raw image byte payload, or 404 Not Found if missing
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
     * Conducts a keyword search case-insensitively across multiple entity attributes.
     *
     * @param keyword term searched against name, description, brand, or category
     * @return 200 OK with the list of matching products, or 204 No Content if no results match
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
     * Creates a new product using a multipart/form-data request.
     * Since HTTP specifications cannot easily transmit complex JSON schemas and raw binary files in a single flat JSON,
     * we utilize {@code @RequestPart}. The "product" part takes the JSON metadata (mapped to ProductRequest DTO),
     * and the optional "imageFile" part takes the binary payload.
     *
     * @param product serialized DTO containing field metadata (validated via @Valid)
     * @param imageFile raw binary payload of the product image (optional)
     * @return 201 Created with the Location header pointing to the new resource URL, 400 Bad Request, or 500 Server Error
     */
    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@Valid @RequestPart ProductRequest product,
            @RequestPart(required = false) MultipartFile imageFile)
    {
        try
        {
            // Maps the request DTO to a persistent Entity, then passes it to the service layer.
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
     * Applies a partial update merging policy: fields present in the DTO overwrite database fields,
     * whereas omitted/null properties are preserved.
     *
     * @param id database ID of the target product
     * @param product serialized update parameters (not fully validated to allow partial inputs)
     * @param imageFile optional new binary image payload
     * @return 200 OK with the updated entity, 404 Not Found, 400 Bad Request, or 500 Server Error
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
            
            // Merges updated DTO properties into the loaded database entity, then persists the result.
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
     * Deletes a product and its associated binary records from the database.
     *
     * @param id database ID of the product to delete
     * @return 204 No Content on success, or 404 Not Found if the product does not exist
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
     * Maps an incoming {@link ProductRequest} DTO to a persistent {@link Product} JPA Entity.
     * Decouples HTTP interface contracts from the underlying database representation.
     *
     * @param request the source data transfer object
     * @return initialized Product Entity ready for processing/persistence
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
     * Merges update parameters from a {@link ProductRequest} DTO into an existing persistent {@link Product} Entity.
     * Only non-null DTO fields are mapped, ensuring omitted fields retain their existing values in the database.
     *
     * @param existingProduct the loaded Entity from persistence
     * @param request the source data transfer object holding partial updates
     * @param id target product database ID
     * @return the merged Product Entity ready to be persisted
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
