package com.backend.springmart.repository;

import com.backend.springmart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
// Spring Data JPA gives this interface CRUD methods automatically.
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // JPQL uses entity field names, so this search works across several text fields
    // in Product.
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@org.springframework.data.repository.query.Param("keyword") String keyword);
}