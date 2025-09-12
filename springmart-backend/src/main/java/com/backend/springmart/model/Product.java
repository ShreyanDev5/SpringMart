package com.backend.springmart.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
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
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;
}
// --------------------------------------------------------------------------------------
// Product: JPA entity representing a product in the system.
//
// Key details:
// - Annotated with @Entity for ORM mapping; fields correspond to database columns.
// - Includes validation annotations (e.g., @NotBlank, @Min) to enforce data integrity.
// - Contains fields for product details (name, price, description, category,
// brand, etc.), stock status, release date, and image data.
// - Uses Lombok annotations (@Data, @AllArgsConstructor, @NoArgsConstructor) to
// reduce boilerplate (getters, setters, constructors).
// - Image data is stored as a byte array with @Lob for large objects; image
// metadata is also included.
//
// This entity is central to the domain model and is used by repositories, services, and controllers.
