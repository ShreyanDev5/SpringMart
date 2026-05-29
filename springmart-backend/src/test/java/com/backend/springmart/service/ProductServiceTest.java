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

// MockitoExtension isolates testing from the heavy Spring ApplicationContext and active database connections,
// allowing tests to run ultra-fast (in milliseconds) as pure Java unit tests.
@ExtendWith(MockitoExtension.class)
class ProductServiceTest
{

    // Prepares a simulated mock instance of ProductRepository. Mockito intercepts calls to this instance.
    @Mock
    private ProductRepository productRepository;

    // Specifies the System Under Test (SUT). Mockito automatically injects the mock repositories declared above
    // into this service instance, bypassing Spring's normal dependency lookup.
    @InjectMocks
    private ProductService productService;

    @Test
    void addOrUpdateProduct_whenAddingNewProduct_shouldReturnSavedProduct()
    {
        // 1. Arrange: Define inputs and configure the mock behavior.
        Product productToSave = new Product();
        productToSave.setName("Test Product");
        productToSave.setPrice(100);

        // Instruct the mock repository to return our product whenever a save operation is executed.
        when(productRepository.save(any(Product.class))).thenReturn(productToSave);

        // 2. Act: Trigger the target method under test.
        Product savedProduct = productService.addOrUpdateProduct(productToSave, null);

        // 3. Assert: Verify method outcomes and inspect repository interactions.
        assertNotNull(savedProduct);
        assertEquals("Test Product", savedProduct.getName());
        
        // Ensure that the repository's save method was called exactly once to confirm database write attempts.
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void addOrUpdateProduct_whenUpdatingExistingProduct_shouldReturnUpdatedProduct()
    {
        // 1. Arrange: Define an existing database record, update inputs, and program mock lookups.
        Product existingProduct = new Product();
        existingProduct.setId(1);
        existingProduct.setName("Old Name");
        existingProduct.setPrice(100);

        Product updatedInfo = new Product();
        updatedInfo.setId(1);
        updatedInfo.setName("New Name");
        updatedInfo.setPrice(120);

        // Mock database loading lookup and subsequent persistence write workflows.
        when(productRepository.findById(1)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updatedInfo);

        // 2. Act: Trigger the target method under test.
        Product updatedProduct = productService.addOrUpdateProduct(updatedInfo, null);

        // 3. Assert: Verify fields are merged correctly and proper mock operations occurred.
        assertNotNull(updatedProduct);
        assertEquals("New Name", updatedProduct.getName());
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}