package com.backend.springmart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * Data Transfer Object (DTO) capturing HTTP input payloads for creating or updating products.
 * 
 * Using a dedicated DTO instead of the persistent JPA Entity protects the internal persistence schema,
 * prevents mass assignment vulnerabilities, and allows customized validation rules for incoming requests.
 * 
 * Enforces standard JSR 380 (Bean Validation 2.0) declarations which are intercepted by Spring's
 * {@code @Valid} annotation at the controller boundary.
 * 
 * Lombok annotations are utilized to eliminate boilerplates:
 * - {@code @Data}: Generates getters, setters, toString, equals, and hashCode.
 * - {@code @NoArgsConstructor}: Generates the default public constructor required by Jackson serialization.
 * - {@code @AllArgsConstructor}: Generates a constructor matching all declared fields.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest
{
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
    private Integer quantity;

    @NotBlank(message = "Brand is required")
    private String brand;

    private Boolean inStock;
    private Date releaseDate;
}
