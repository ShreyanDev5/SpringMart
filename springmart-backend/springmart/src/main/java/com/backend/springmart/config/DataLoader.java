package com.backend.springmart.config;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.io.IOException;
import java.io.InputStream;
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
                // Helper method to load image bytes from classpath resources
                java.util.function.Function<String, byte[]> loadImage = (resourcePath) -> {
                    try (InputStream is = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
                        if (is != null) {
                            return is.readAllBytes();
                        } else {
                            System.out.println("Image not found: " + resourcePath);
                            return null;
                        }
                    } catch (IOException e) {
                        System.out.println("Error loading image: " + resourcePath);
                        return null;
                    }
                };

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
                                loadImage.apply("images/mouse.jpg") // Load image from classpath
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
                                loadImage.apply("images/keyboard.jpg")
                        ),
                        new Product(
                                0,
                                "Gaming Headset",
                                2999,
                                "Over-ear gaming headset with mic",
                                "Electronics",
                                20,
                                "Razer",
                                true,
                                new Date(),
                                "headset.jpg",
                                "image/jpeg",
                                loadImage.apply("images/headset.jpg")
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
