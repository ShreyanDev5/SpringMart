package com.backend.springmart.service;

import com.backend.springmart.model.Product;
import com.backend.springmart.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service Layer class orchestrating the core business rules and database transactions.
 *
 * Functions as the intermediary between the API Controller and the Repository:
 * - Coordinates transactional operations (ensuring all steps complete or fail together).
 * - Implements logic for fallback image preservation.
 * - Restores omitted properties during partial updates.
 */
@Service
public class ProductService
{
    // Field injection via @Autowired is preserved here to match the project's existing architecture style.
    // In larger-scale modules, constructor injection is generally preferred for ease of mocking and test isolation.
    @Autowired
    ProductRepository repo;

    /**
     * Retrieves all products currently stored in the database.
     * Use with caution as pulling an unbounded dataset can degrade memory performance in high-volume tables.
     *
     * @return a list of all products
     */
    public List<Product> getAllProducts()
    {
        return repo.findAll();
    }

    /**
     * Retrieves a paginated slice of products.
     * Leverages Spring Data JPA's native pagination under the hood.
     *
     * @param pageable configuration parameters detailing page index, size, and sorting
     * @return a page containing the requested products slice
     */
    public Page<Product> getAllProducts(Pageable pageable)
    {
        return repo.findAll(pageable);
    }

    /**
     * Looks up a product by its primary key.
     *
     * @param productId database ID of the target product
     * @return the matching Product, or null if no record was found
     */
    public Product getProductById(int productId)
    {
        return repo.findById(productId).orElse(null);
    }

    /**
     * Conducts a case-insensitive keyword search.
     * Falls back to returning all products if the keyword is blank or null.
     *
     * @param keyword term searched against attributes
     * @return list of matching products
     */
    public List<Product> searchProducts(String keyword)
    {
        if (keyword == null || keyword.isEmpty())
        {
            return getAllProducts();
        }
        return repo.searchProducts(keyword);
    }

    /**
     * Creates or updates a product inside the H2 database.
     *
     * Incorporates several critical business-rule workflows:
     * 1. Validation & State Check: Verifies if an update is requested and if the product exists in the DB.
     * 2. Image Handlers: Translates multipart binary uploads to byte arrays, and implements a fallback to preserve old image data if no new image is provided.
     * 3. Omitted Field Restoration: Safely merges incoming changes with the existing database record so partial updates don't wipe out existing details.
     *
     * @param product the Product entity to persist
     * @param imageFile optional newly uploaded binary image file
     * @return the persisted Product entity containing generated primary keys and metadata
     * @throws RuntimeException if the target product ID is not found for updates, or processing fails
     */
    public Product addOrUpdateProduct(@Valid Product product, MultipartFile imageFile)
    {
        Product existing = (product.getId() != 0) ? repo.findById(product.getId()).orElse(null) : null;
        if (product.getId() != 0 && existing == null)
        {
            throw new RuntimeException("Product not found");
        }

        try
        {
            // Apply logic to populate or maintain binary image data and matching content-types.
            updateImageFields(product, imageFile, existing);

            if (existing != null)
            {
                // If it is an update, restore any original product fields that were omitted (null) in the request payload.
                updateMissingFields(product, existing);
            }
            return repo.save(product);
        }
        catch (Exception e)
        {
            throw new RuntimeException("Failed to process product: " + e.getMessage(), e);
        }
    }

    /**
     * Removes a product from the database.
     * Spring Data JPA handles cascades and constraint checks internally.
     *
     * @param productId database ID of the product
     */
    public void deleteProduct(int productId)
    {
        repo.deleteById(productId);
    }

    /**
     * Helper routine to apply multipart image upload fields to the product entity.
     *
     * Handles two distinct scenarios:
     * 1. New Image Uploaded: Reads the binary stream to raw bytes, extracts the filename, and captures the MIME content-type.
     * 2. No Image Uploaded: If this is an update, it restores the image bytes, name, and type from the database record to prevent accidental deletion.
     *
     * @param product target product entity being prepared
     * @param imageFile optional newly uploaded multipart image file
     * @param existing original database product instance (null if creating a new product)
     * @throws Exception if reading the binary file stream fails
     */
    private void updateImageFields(Product product, MultipartFile imageFile, Product existing) throws Exception
    {
        if (imageFile != null && !imageFile.isEmpty())
        {
            product.setImageName(imageFile.getOriginalFilename());
            product.setImageType(imageFile.getContentType());
            product.setImageData(imageFile.getBytes());
        }
        else if (existing != null)
        {
            product.setImageName(existing.getImageName());
            product.setImageType(existing.getImageType());
            product.setImageData(existing.getImageData());
        }
    }

    /**
     * Helper routine to merge omitted fields from an original product database entry during partial updates.
     *
     * Standard HTTP PUT payloads might only contain a subset of fields (e.g. updating price).
     * If these incoming null fields were saved as-is, they would overwrite and wipe out existing database details.
     * This method ensures required properties are safely preserved by restoring original database values when the incoming field is null.
     *
     * @param product target product instance holding the update changes
     * @param existing original persistent product loaded from the database
     */
    private void updateMissingFields(Product product, Product existing)
    {
        if (product.getName() == null)
            product.setName(existing.getName());
        if (product.getPrice() == null)
            product.setPrice(existing.getPrice());
        if (product.getDescription() == null)
            product.setDescription(existing.getDescription());
        if (product.getCategory() == null)
            product.setCategory(existing.getCategory());
        if (product.getBrand() == null)
            product.setBrand(existing.getBrand());
        if (product.getReleaseDate() == null)
            product.setReleaseDate(existing.getReleaseDate());
    }
}
