package com.backend.springmart.service;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
// Holds product business logic so the controller only deals with HTTP concerns.
public class ProductService {
    @Autowired
    // Repository is the database access layer for Product entities.
    ProductRepository repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // Pageable lets the controller request just one page of products at a time.
    public Page<Product> getAllProducts(Pageable pageable) {
        return repo.findAll(pageable);
    }

    public Product getProductById(int productId) {
        return repo.findById(productId).orElse(null);
    }

    public List<Product> searchProducts(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return getAllProducts();
        }
        return repo.searchProducts(keyword);
    }

    public Product addOrUpdateProduct(@Valid Product product, MultipartFile imageFile) {
        // If an ID is present, treat the request as an update and load the current row
        // first.
        Product existing = (product.getId() != 0) ? repo.findById(product.getId()).orElse(null) : null;
        if (product.getId() != 0 && existing == null) {
            throw new RuntimeException("Product not found");
        }

        try {
            updateImageFields(product, imageFile, existing);
            if (existing != null) {
                updateMissingFields(product, existing);
            }
            return repo.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process product: " + e.getMessage(), e);
        }
    }

    public void deleteProduct(int productId) {
        repo.deleteById(productId);
    }

    private void updateImageFields(Product product, MultipartFile imageFile, Product existing) throws Exception {
        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        } else if (existing != null) {
            // Keep the old image when an update changes text fields only.
            product.setImageName(existing.getImageName());
            product.setImageType(existing.getImageType());
            product.setImageData(existing.getImageData());
        }
    }

    private void updateMissingFields(Product product, Product existing) {
        // Supports partial updates by falling back to the stored value when a field is
        // omitted.
        if (product.getName() == null)
            product.setName(existing.getName());
        if (product.getPrice() == null)
            product.setPrice(existing.getPrice());
        if (product.getDescription() == null)
            product.setDescription(existing.getDescription());
        if (product.getCategory() == null)
            product.setCategory(existing.getCategory());
        if (product.getBrand() == null)
            product.setBrand(existing.getBrand());
        if (product.getReleaseDate() == null)
            product.setReleaseDate(existing.getReleaseDate());
    }
}
