package com.backend.springmart.service;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

// Mockito lets this test focus on ProductService without starting Spring or a real database.
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    // Fake repository used to control database behavior in each test.
    @Mock
    private ProductRepository productRepository;

    // Real service instance with the fake repository injected into it.
    @InjectMocks
    private ProductService productService;

    @Test
    void addOrUpdateProduct_whenAddingNewProduct_shouldReturnSavedProduct() {
        // Arrange: a brand-new product should go straight to save().
        Product productToSave = new Product();
        productToSave.setName("Test Product");
        productToSave.setPrice(100);

        when(productRepository.save(any(Product.class))).thenReturn(productToSave);

        // Act
        Product savedProduct = productService.addOrUpdateProduct(productToSave, null);

        // Assert
        assertNotNull(savedProduct);
        assertEquals("Test Product", savedProduct.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void addOrUpdateProduct_whenUpdatingExistingProduct_shouldReturnUpdatedProduct() {
        // Arrange: the service should load the existing row before saving an update.
        Product existingProduct = new Product();
        existingProduct.setId(1);
        existingProduct.setName("Old Name");
        existingProduct.setPrice(100);

        Product updatedInfo = new Product();
        updatedInfo.setId(1);
        updatedInfo.setName("New Name");
        updatedInfo.setPrice(120);

        when(productRepository.findById(1)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updatedInfo);

        // Act
        Product updatedProduct = productService.addOrUpdateProduct(updatedInfo, null);

        // Assert
        assertNotNull(updatedProduct);
        assertEquals("New Name", updatedProduct.getName());
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}