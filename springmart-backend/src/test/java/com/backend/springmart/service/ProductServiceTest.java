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

// Uses MockitoExtension to isolate ProductService tests from the Spring ApplicationContext and external database dependencies.
@ExtendWith(MockitoExtension.class)
class ProductServiceTest
{

    // Mocked repository instance to simulate database persistence behavior.
    @Mock
    private ProductRepository productRepository;

    // System Under Test (SUT) with the mocked repository automatically injected.
    @InjectMocks
    private ProductService productService;

    @Test
    void addOrUpdateProduct_whenAddingNewProduct_shouldReturnSavedProduct()
    {
        // Arrange: Set up a new product request that should be directly saved.
        Product productToSave = new Product();
        productToSave.setName("Test Product");
        productToSave.setPrice(100);

        when(productRepository.save(any(Product.class))).thenReturn(productToSave);

        // Act: Execute the service method under test
        Product savedProduct = productService.addOrUpdateProduct(productToSave, null);

        // Assert: Verify correct results and mock interactions
        assertNotNull(savedProduct);
        assertEquals("Test Product", savedProduct.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void addOrUpdateProduct_whenUpdatingExistingProduct_shouldReturnUpdatedProduct()
    {
        // Arrange: Set up mock behavior to simulate loading an existing product from the database before applying the update.
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

        // Act: Execute the service method under test
        Product updatedProduct = productService.addOrUpdateProduct(updatedInfo, null);

        // Assert: Verify correct results and mock interactions
        assertNotNull(updatedProduct);
        assertEquals("New Name", updatedProduct.getName());
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}