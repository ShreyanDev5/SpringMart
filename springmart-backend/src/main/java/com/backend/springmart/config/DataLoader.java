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

/**
 * Configuration class responsible for seeding demo product data on startup.
 * Seeds data only if the database is currently empty.
 */
@Configuration
public class DataLoader
{
    /**
     * Initializes demo product data inside the database on application startup.
     *
     * @param productRepository repository used to check database count and persist products
     * @return a CommandLineRunner that executes the seeding logic
     */
    @Bean
    CommandLineRunner loadDemoData(ProductRepository productRepository)
    {
        return args ->
        {
            // Seed the database only if no products are present
            if (productRepository.count() == 0)
            {
                // Helper function to load demo product image bytes from classpath resources
                java.util.function.Function<String, byte[]> loadImage = resourcePath ->
                {
                    Resource res = new ClassPathResource(resourcePath);
                    try (InputStream is = res.getInputStream())
                    {
                        if (is != null)
                        {
                            return is.readAllBytes();
                        }
                    }
                    catch (IOException e)
                    {
                        System.out.println("Image not found: " + resourcePath);
                    }
                    return null;
                };

                // Create a list of initial seed products with realistic descriptions, categories, and image payloads
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
            }
            else
            {
                System.out.println("ℹ️ Products already exist. Skipping demo load.");
            }
        };
    }
}
