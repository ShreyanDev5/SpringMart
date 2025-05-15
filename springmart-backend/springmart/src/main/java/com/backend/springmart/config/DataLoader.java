package com.backend.springmart.config;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Date;
import java.util.List;

@Configuration
public class DataLoader
{
    @Bean
    CommandLineRunner loadDemoData(ProductRepository productRepository)
    {
        return args -> {
            // Load demo products only if table is empty
            if (productRepository.count() == 0)
            {
                List<Product> demoProducts = List.of(
                        new Product(
                                0,
                                "Wireless Mouse",
                                799,
                                "Ergonomic mouse with USB receiver",
                                "Electronics",
                                50,
                                "LogiTech",
                                true,
                                new Date(),
                                "mouse.jpg",
                                "image/jpeg",
                                null  // No image data for now
                        ),
                        new Product(
                                0,
                                "Mechanical Keyboard",
                                1999,
                                "RGB backlit mechanical keyboard",
                                "Electronics",
                                30,
                                "KeyChron",
                                true,
                                new Date(),
                                "keyboard.jpg",
                                "image/jpeg",
                                null  // No image data for now
                        )
                );

                productRepository.saveAll(demoProducts);
                System.out.println("✅ Demo products loaded.");
            }
            else
            {
                System.out.println("ℹ️ Products already exist. Skipping demo load.");
            }
        };
    }
}
