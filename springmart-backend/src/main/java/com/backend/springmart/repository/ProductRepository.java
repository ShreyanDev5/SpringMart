package com.backend.springmart.repository;

import com.backend.springmart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA Repository interface mapping operations to the Product entity.
 * Generates automated SQL and manages custom database queries.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{
    /**
     * Conducts a keyword search case-insensitively across multiple entity attributes.
     * Matches name, description, category, or brand.
     *
     * @param keyword term searched against attributes
     * @return list of matching products found in the database
     */
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);
}