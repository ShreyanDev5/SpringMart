# SpringMart Backend Interview Guide

## Structure in One Sentence

This backend follows the common Spring Boot flow: controller receives HTTP requests, service applies business logic, repository talks to the database, and the Product entity represents the table row being stored.

## Main Pieces

- SpringMartApplication: starts Spring Boot and loads all backend components.
- ProductController: receives API requests and returns HTTP responses.
- ProductService: contains the main product logic.
- ProductRepository: performs database operations through Spring Data JPA.
- Product: defines the product fields stored in the database.
- DataLoader: inserts demo products when the database is empty.

## Request Lifecycle: Create a Product

1. The frontend sends `POST /api/products` as `multipart/form-data`.
2. `ProductController.addProduct(...)` receives the request.
3. Spring converts the JSON part into a `Product` object and gives the uploaded file as `MultipartFile`.
4. `@Valid` checks the product fields against validation rules in `Product`.
5. The controller calls `ProductService.addOrUpdateProduct(product, imageFile)`.
6. The service reads the image bytes, fills image metadata, and prepares the entity.
7. The service calls `ProductRepository.save(product)`.
8. Spring Data JPA and Hibernate turn the `Product` object into an SQL `INSERT`.
9. H2 stores the row and generates the product ID.
10. The saved `Product` comes back through repository -> service -> controller.
11. The controller returns `201 Created` and adds a `Location` header for the new product.

## Request Lifecycle: Update a Product

1. The frontend sends `PUT /api/products/{id}`.
2. The controller first checks whether that product already exists.
3. The controller forces the path ID into the incoming `Product` object.
4. The service loads the existing product when the ID is non-zero.
5. If no new image is uploaded, the service keeps the old image.
6. If some fields are missing, the service keeps the old stored values.
7. The repository `save(...)` call becomes an SQL `UPDATE` instead of a new insert.

## Request Lifecycle: Get Products

1. The frontend sends `GET /api/products?page=0&size=10`.
2. The controller builds a `PageRequest` object.
3. The service calls `repo.findAll(pageable)`.
4. JPA reads one page of rows from H2.
5. The controller returns a `Page<Product>` as JSON.

## Request Lifecycle: Search Products

1. The frontend sends `GET /api/products/search?keyword=...`.
2. The controller passes the keyword to the service.
3. The service either returns all products for an empty keyword or calls the custom repository query.
4. The repository runs the JPQL search across name, description, category, and brand.
5. Matching `Product` objects are returned as JSON.

## Request Lifecycle: Get Product Image

1. The frontend sends `GET /api/products/image/{id}`.
2. The controller loads the product through the service.
3. The controller reads `imageType` and `imageData` from the product.
4. The response is returned as raw bytes with the correct `Content-Type` header.

## Request Lifecycle: Delete a Product

1. The frontend sends `DELETE /api/products/{id}`.
2. The controller checks that the product exists.
3. The service calls `repo.deleteById(id)`.
4. JPA issues an SQL `DELETE`.
5. The controller returns `204 No Content`.

## How the Layers Connect

- Controller to Service: HTTP details stop at the controller.
- Service to Repository: business logic stops at the service.
- Repository to Database: persistence details stop at the repository.
- Entity to Table: the `Product` class is the Java form of one database row.

## What to Say in an Interview

- "I used a layered Spring Boot structure so each class had one job."
- "The controller handles requests, the service handles logic, and the repository handles persistence."
- "Validation is defined on the Product entity and applied when requests come in."
- "I used JPA for CRUD plus one custom JPQL search query."
- "Images are stored in the database as bytes for simplicity in this project."
- "A startup data loader seeds demo products so the app is usable immediately."

## One Important Limitation

This project is structured well for learning, but the current production profile still uses H2. In a stronger production setup, you would usually switch to PostgreSQL and often store images outside the database.
