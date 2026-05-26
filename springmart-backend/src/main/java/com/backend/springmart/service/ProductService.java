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
 * Service class orchestrating business logic and transactions for Product entities.
 * Coordinates input validations, database operations, partial merges, and image file stream conversions.
 */
@Service
public class ProductService
{
    @Autowired
    ProductRepository repo;

    /**
     * Retrieves all products currently stored in the database.
     *
     * @return a list of all products
     */
    public List<Product> getAllProducts()
    {
        return repo.findAll();
    }

    /**
     * Retrieves a paginated slice of products.
     *
     * @param pageable configuration parameters detailing page index and size
     * @return a page containing the requesting products slice
     */
    public Page<Product> getAllProducts(Pageable pageable)
    {
        return repo.findAll(pageable);
    }

    /**
     * Looks up a product by its database ID.
     *
     * @param productId database ID of the target product
     * @return the matching Product, or null if no record was found
     */
    public Product getProductById(int productId)
    {
        return repo.findById(productId).orElse(null);
    }

    /**
     * Conducts a keyword search. Returns all products if the keyword is blank.
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
     * Creates or updates a product.
     * Integrates image data conversion from multipart payloads, fallback rules to preserve existing image bytes,
     * and missing field restoration for updates.
     *
     * @param product the Product entity to persist
     * @param imageFile optional new binary image payload
     * @return the persisted Product entity
     * @throws RuntimeException if the target product ID is not found for updates, or processing failed
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
            // Populate or maintain the binary image payloads and related metadata
            updateImageFields(product, imageFile, existing);
            if (existing != null)
            {
                // Restore any missing product attributes that were omitted from a partial updates payload
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
     * Removes a product from the database by its ID.
     *
     * @param productId database ID of the product
     */
    public void deleteProduct(int productId)
    {
        repo.deleteById(productId);
    }

    /**
     * Helper routine to apply multipart image upload fields to a product entity.
     * If no new file is uploaded, retains the existing image bytes if present.
     *
     * @param product target product entity being prepared
     * @param imageFile optional newly uploaded multipart image file
     * @param existing original database product instance (if performing an update)
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
     * Ensures required properties are preserved.
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
