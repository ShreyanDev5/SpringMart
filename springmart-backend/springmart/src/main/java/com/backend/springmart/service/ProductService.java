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
        if (imageFile != null && !imageFile.isEmpty())
        {
            try
            {
                product.setImageData(imageFile.getBytes());
                product.setImageType(imageFile.getContentType());
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        }
        return repo.save(product);
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