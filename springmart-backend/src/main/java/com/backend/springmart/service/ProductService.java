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
public class ProductService {
    @Autowired
    ProductRepository repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

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

    public Product addOrUpdateProduct(@Valid Product product, MultipartFile imageFile)
    {
        Product existing = (product.getId() != 0) ? repo.findById(product.getId()).orElse(null) : null;
        if (product.getId() != 0 && existing == null)
        {
            throw new RuntimeException("Product not found");
        }

        try
        {
            updateImageFields(product, imageFile, existing);
            if (existing != null)
            {
                updateMissingFields(product, existing);
            }
            return repo.save(product);
        } catch (Exception e)
        {
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
            product.setImageName(existing.getImageName());
            product.setImageType(existing.getImageType());
            product.setImageData(existing.getImageData());
        }
    }

    private void updateMissingFields(Product product, Product existing) {
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
// --------------------------------------------------------------------------------------
// ProductService: Service layer for business logic related to products.
//
// Key details:
// - Annotated with @Service; acts as an intermediary between controllers and
// the repository.
// - Handles product retrieval, search, creation, update, and deletion.
// - Manages image file processing and field validation before persistence.
// - Encapsulates business rules and error handling, keeping controllers thin.
// - Relies on ProductRepository for data access and Product for the domain
// model.
//
// Centralizes product-related logic, making it easier to maintain and extend
// business rules.