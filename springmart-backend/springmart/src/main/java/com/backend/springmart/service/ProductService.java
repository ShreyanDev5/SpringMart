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

@Service
public class ProductService
{
    @Autowired
    ProductRepository repo;

    public List<Product> getAllProducts()
    {
        return repo.findAll();
    }

    public Page<Product> getAllProducts(Pageable pageable)
    {
        return repo.findAll(pageable);
    }

    public Product getProductById(int productId)
    {
        return repo.findById(productId).orElse(null);
    }

    public List<Product> searchProducts(String keyword)
    {
        if (keyword == null || keyword.isEmpty())
        {
            return getAllProducts();
        }
        return repo.searchProducts(keyword);
    }



    public Product addOrUpdateProduct(@Valid Product product, MultipartFile imageFile)
    {
        Product existing = (product.getId() != 0) ? repo.findById(product.getId()).orElse(null) : null;
        if (product.getId() != 0 && existing == null)
        {
            throw new RuntimeException("Product not found");
        }

        try
        {
            updateImageFields(product, imageFile, existing);
            if (existing != null)
            {
                updateMissingFields(product, existing);
            }
            return repo.save(product);
        }
        catch (Exception e)
        {
            throw new RuntimeException("Failed to process product: " + e.getMessage(), e);
        }
    }

    private void updateImageFields(Product product, MultipartFile imageFile, Product existing) throws Exception
    {
        if (imageFile != null && !imageFile.isEmpty())
        {
            product.setImageData(imageFile.getBytes());
            product.setImageType(imageFile.getContentType());
            product.setImageName(imageFile.getOriginalFilename());
        }
        else if (existing != null)
        {
            product.setImageData(existing.getImageData());
            product.setImageType(existing.getImageType());
            product.setImageName(existing.getImageName());
        }
    }

    private void updateMissingFields(Product product, Product existing)
    {
        if (isBlank(product.getName())) product.setName(existing.getName());
        if (product.getDescription() == null) product.setDescription(existing.getDescription());
        if (isBlank(product.getCategory())) product.setCategory(existing.getCategory());
        if (isBlank(product.getBrand())) product.setBrand(existing.getBrand());
        if (product.getPrice() == null) product.setPrice(existing.getPrice());
        if (product.getQuantity() == 0) product.setQuantity(existing.getQuantity());
        if (product.getReleaseDate() == null) product.setReleaseDate(existing.getReleaseDate());
        // inStock is always set from incoming product
    }

    private boolean isBlank(String str)
    {
        return str == null || str.isBlank();
    }



    public void deleteProduct(int id)
    {
        Product product = getProductById(id);
        if (product != null)
        {
            repo.delete(product);
        }
    }
}