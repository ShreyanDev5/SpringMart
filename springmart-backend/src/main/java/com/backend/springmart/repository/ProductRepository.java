package com.backend.springmart.repository;

import com.backend.springmart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Data Access Layer interface extending {@link JpaRepository}.
 * 
 * Spring Data JPA dynamically generates concrete implementations at runtime:
 * - Provides generic CRUD (Create, Read, Update, Delete) and pagination methods without boilerplate.
 * - Handles type mappings and manages H2 database connections automatically.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{
    /**
     * Conducts a flexible keyword search case-insensitively across multiple Product entity attributes.
     * 
     * Uses JPQL (Java Persistence Query Language):
     * - Queries are formulated against JPA class attributes (e.g., 'p.name', 'p.brand') rather than raw database column names.
     * - SQL case-insensitivity is achieved by converting both sides to lower-case using {@code LOWER()}.
     * - The {@code CONCAT('%', :keyword, '%')} clauses perform substring matching equivalent to a SQL wild-card LIKE operator.
     *
     * @param keyword search term inputted by the user
     * @return list of all matching products found in H2
     */
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@Param("keyword") String keyword);
}