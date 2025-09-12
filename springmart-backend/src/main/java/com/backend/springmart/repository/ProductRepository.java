package com.backend.springmart.repository;

import com.backend.springmart.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>
{
    // Custom JPQL query to search products by name or description or category or
    // brand
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(@org.springframework.data.repository.query.Param("keyword") String keyword);
}

// --------------------------------------------------------------------------------------
// ProductRepository: Spring Data JPA repository for Product entity operations.
//
// Key details:
// - FROM Product p: Specifies the data source for JPQL queries. 'Product'
// refers to the entity class (annotated with @Entity), not the database table
// name. 'p' is an alias for use in the query.
// - JPQL vs. SQL: JPQL (Java Persistence Query Language) operates on Java
// entity objects and their fields, not directly on database tables and columns
// as SQL does. This abstraction allows queries to be written in terms of the
// domain model.
// - Custom search: The searchProducts method enables flexible, case-insensitive
// searching across multiple fields (name, description, category, brand) using
// LIKE and wildcards.