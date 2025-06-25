package com.backend.springmart.controller;

import com.backend.springmart.model.Product;
import com.backend.springmart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController
{

    @Autowired
    private ProductService service;

    @GetMapping("/")
    public ResponseEntity<String> hello()
    {
        return ResponseEntity.ok("Hello from Spring Boot!");
    }

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> getProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size)
    {
        Page<Product> products = service.getAllProducts(PageRequest.of(page, size));
        if (products.isEmpty())
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

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

    @GetMapping ("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword)
    {
        List<Product> products = service.searchProducts(keyword);
        if (products.isEmpty())
        {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(products);
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@Valid @RequestPart Product product, @RequestPart(required = false) MultipartFile imageFile)
    {
        try
        {
            Product createdProduct = service.addOrUpdateProduct(product, imageFile);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", "/api/products/" + createdProduct.getId());
            return new ResponseEntity<>(createdProduct, headers, HttpStatus.CREATED);
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


    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @Valid @RequestPart Product product, @RequestPart(required = false) MultipartFile imageFile)
    {
        try {
            Product existingProduct = service.getProductById(id);
            if (existingProduct == null)
            {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }
            product.setId(id);
            Product updatedProduct = service.addOrUpdateProduct(product, imageFile);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

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
}
