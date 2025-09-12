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
public class DataLoader {
    @Bean
    CommandLineRunner loadDemoData(ProductRepository productRepository) {
        return args -> {
            // Load demo products only if table is empty
            if (productRepository.count() == 0) {
                // Helper method to load image bytes from classpath resources
                java.util.function.Function<String, byte[]> loadImage = resourcePath -> {
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
                                "mouse.jpg",
                                "image/jpeg",
                                loadImage.apply("images/mouse.jpg")),
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
                                loadImage.apply("images/keyboard.jpg")),
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
                                loadImage.apply("images/headset.jpg")),
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
                                "leather_bag.jpg",
                                "image/jpeg",
                                loadImage.apply("images/leather_bag.jpg")),
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
                                "whoop_band.jpg",
                                "image/jpeg",
                                loadImage.apply("images/whoop_band.jpg")),
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
                                "atomic_habit_book.webp",
                                "image/webp",
                                loadImage.apply("images/atomic_habit_book.webp")),
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
                                "puma_shoes.jpg",
                                "image/jpeg",
                                loadImage.apply("images/puma_shoes.jpg")));

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
