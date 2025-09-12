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

// This tells JUnit 5 to enable Mockito
@ExtendWith(MockitoExtension.class)
class ProductServiceTest
{

    // Creates a mock (a "stunt double") of ProductRepository
    @Mock
    private ProductRepository productRepository;

    // Creates a real instance of ProductService and injects the mocks into it
    @InjectMocks
    private ProductService productService;

    // This test checks if the addOrUpdateProduct method works correctly
    // when we are adding a new product (not updating an existing one).
    @Test
    void addOrUpdateProduct_whenAddingNewProduct_shouldReturnSavedProduct()
    {
        // 1. Arrange
        // Create a new product object to be saved. It has no ID yet.
        Product productToSave = new Product();
        productToSave.setName("Test Product");
        productToSave.setPrice(100);

        // Tell our mock repository what to do when its save() method is called.
        // when(any(Product.class)) is a matcher that means "any Product object".
        // We're saying: "When the save method is called with any product,
        // then return that same product."
        when(productRepository.save(any(Product.class))).thenReturn(productToSave);

        // 2. Act
        // Call the method under test
        Product savedProduct = productService.addOrUpdateProduct(productToSave, null);

        // 3. Assert
        // Check that the returned product is not null
        assertNotNull(savedProduct);

        // Check that the product name is what we expect
        assertEquals("Test Product", savedProduct.getName());

        // Verify that the repository's save() method was called exactly 1 time
        // with any Product object.
        verify(productRepository, times(1)).save(any(Product.class));
    }


    @Test
    void addOrUpdateProduct_whenUpdatingExistingProduct_shouldReturnUpdatedProduct()
    {
        // 1. Arrange
        // This represents the product already in the database
        Product existingProduct = new Product();
        existingProduct.setId(1);
        existingProduct.setName("Old Name");
        existingProduct.setPrice(100);

        // This represents the incoming request with updated information
        Product updatedInfo = new Product();
        updatedInfo.setId(1); // It must have the same ID
        updatedInfo.setName("New Name");
        updatedInfo.setPrice(120);

        // When the repo is asked to find a product with ID 1,
        // return our "existingProduct". We wrap it in Optional.of()
        // because that's what Spring Data JPA repositories return.
        when(productRepository.findById(1)).thenReturn(Optional.of(existingProduct));

        // When the repo is asked to save any product,
        // return the product with the updated info.
        when(productRepository.save(any(Product.class))).thenReturn(updatedInfo);

        // 2. Act
        Product updatedProduct = productService.addOrUpdateProduct(updatedInfo, null);

        // 3. Assert
        assertNotNull(updatedProduct);
        assertEquals("New Name", updatedProduct.getName());
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(any(Product.class));
    }
}