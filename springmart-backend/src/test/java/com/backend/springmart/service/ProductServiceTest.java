package com.backend.springmart.service;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

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

    // Our test methods will go here...
}