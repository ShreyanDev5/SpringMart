package com.backend.springmart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

/**
 * Persistent JPA Entity mapped to the relational database table "Product".
 * 
 * Configured as a standard Java Bean carrying Object-Relational Mapping (ORM) metadata:
 * - {@code @Entity}: Declares this class as a JPA entity managed by Hibernate (the default persistence provider).
 * - {@code @Id}: Flags the primary key.
 * - {@code @GeneratedValue(strategy = GenerationType.IDENTITY)}: Indicates database-native auto-incrementing identity values.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private Integer price;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    private int quantity;

    @NotBlank(message = "Brand is required")
    private String brand;

    private boolean inStock;
    private Date releaseDate;

    // Image-related metadata (stored as standard string columns)
    private String imageName;
    private String imageType; // Captures the MIME type (e.g., image/jpeg) to construct accurate HTTP streams.

    /**
     * Stores original binary image bytes directly inside the database.
     * 
     * The {@code @Lob} (Large Object) annotation instructs Hibernate and the database engine 
     * to allocate a BLOB (Binary Large Object) column instead of a standard VARCHAR/VARBINARY.
     */
    @Lob
    private byte[] imageData;
}
