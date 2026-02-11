package com.backend.springmart.config;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner loadDemoData(ProductRepository productRepository) {
        return args -> {
            // Load demo products only if table is empty
            if (productRepository.count() == 0) {
                // Helper method to load image bytes from classpath resources using Spring's ClassPathResource
                java.util.function.Function<String, byte[]> loadImage = resourcePath -> {
                    Resource res = new ClassPathResource(resourcePath);
                    try (InputStream is = res.getInputStream()) {
                        if (is != null) {
                            return is.readAllBytes();
                        }
                    } catch (IOException e) {
                        System.out.println("Image not found: " + resourcePath);
                    }
                    return null;
                };

                // List of demo products to seed the database
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
                                "mouse.webp",
                                "image/webp",
                                loadImage.apply("images/mouse.webp")),
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
                                "keyboard.png",
                                "image/png",
                                loadImage.apply("images/keyboard.png")),
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
                                "headset.webp",
                                "image/webp",
                                loadImage.apply("images/headset.webp")),
                        new Product(
                                0,
                                "Leather Bag for Women",
                                2499,
                                "Premium leather handbag for women",
                                "Fashion",
                                15,
                                "Fossil",
                                true,
                                new Date(),
                                "bag.png",
                                "image/png",
                                loadImage.apply("images/bag.png")),
                        new Product(
                                0,
                                "Whoop Fitness Band",
                                3499,
                                "Advanced fitness and health tracker band",
                                "Health",
                                25,
                                "Whoop",
                                true,
                                new Date(),
                                "whoop_band.png",
                                "image/png",
                                loadImage.apply("images/whoop_band.png")),
                        new Product(
                                0,
                                "Atomic Habits Book",
                                499,
                                "Bestselling self-help book by James Clear",
                                "Books",
                                40,
                                "Penguin",
                                true,
                                new Date(),
                                "book.jpg",
                                "image/jpeg",
                                loadImage.apply("images/book.jpg")),
                        new Product(
                                0,
                                "CMF Buds Pro 2",
                                3499,
                                "Noise-cancelling wireless earbuds",
                                "Electronics",
                                35,
                                "CMF",
                                true,
                                new Date(),
                                "cmf_buds.webp",
                                "image/webp",
                                loadImage.apply("images/cmf_buds.webp")),
                        new Product(
                                0,
                                "Samsung Smart TV",
                                39999,
                                "50-inch 4K Ultra HD Smart LED TV",
                                "Electronics",
                                10,
                                "Samsung",
                                true,
                                new Date(),
                                "samsung_tv.avif",
                                "image/avif",
                                loadImage.apply("images/samsung_tv.avif")),
                        new Product(
                                0,
                                "Puma Running Shoes",
                                2999,
                                "Lightweight running shoes for men",
                                "Sports",
                                28,
                                "Puma",
                                true,
                                new Date(),
                                "shoe.png",
                                "image/png",
                                loadImage.apply("images/shoe.png")));

                productRepository.saveAll(demoProducts);
                System.out.println("✅ Demo products loaded.");
            } else {
                System.out.println("ℹ️ Products already exist. Skipping demo load.");
            }
        };
    }
}

// --------------------------------------------------------------------------------------
// DataLoader: Configuration class for loading demo product data at startup.
//
// Key details:
// - Annotated with @Configuration; defines a CommandLineRunner bean to run
// after application startup.
// - Loads demo products into the database if the product table is empty.
// - Includes logic to load image files from classpath resources and attach them
// to Product entities.
// - Useful for development and testing; not intended for production data
// seeding.
// - Relies on ProductRepository and Product entity for persistence and
// structure.
//
// Helps ensure the application has sample data for immediate use after
// deployment in dev/test environments.
