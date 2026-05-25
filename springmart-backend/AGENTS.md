# AGENTS.md

## Project snapshot
- SpringMart backend is a Java 21 / Spring Boot 3.4.5 / Maven app (`pom.xml`).
- Main entry point: `src/main/java/com/backend/springmart/SpringMartApplication.java`.
- The request path is consistently `Controller -> Service -> Repository -> JPA Entity`.

## Architecture to preserve
- `ProductController` exposes REST endpoints under `/api` and stays thin.
- `ProductService` contains business rules such as partial update handling and image preservation.
- `ProductRepository` is a Spring Data JPA repository with a JPQL keyword search across `name`, `description`, `category`, and `brand`.
- `Product` is the central JPA entity and also carries Bean Validation rules (`@NotBlank`, `@NotNull`, `@Min`, `@Size`).
- `ProductRequest` (`src/main/java/com/backend/springmart/dto/ProductRequest.java`) is the multipart request DTO used by the controller so HTTP input stays separate from persistence.
- `DataLoader` seeds demo products once on startup when the table is empty; it also loads image bytes from `src/main/resources/images/`.

## API and data flow conventions
- Product create/update uses `multipart/form-data`: one `ProductRequest` part plus optional `imageFile`.
- The controller maps `ProductRequest` to `Product` before calling `ProductService.addOrUpdateProduct(...)`; updates merge the request into the stored entity and keep the old image when no new file is uploaded.
- The controller returns `204 No Content` for empty list/search results, `404` for missing products, and `201 Created` with a `Location` header on create.
- Image retrieval is separate at `/api/products/image/{id}` and returns raw bytes with the stored content type.

## Runtime and environment notes
- Default local profile stores H2 on disk at `./data/springmartdb` and enables the H2 console at `/h2-console` (`src/main/resources/application.properties`).
- Docker uses `SPRING_PROFILES_ACTIVE=docker`, persists H2 in `/app/data`, and maps port `8080` (`docker-compose.yml`, `application-docker.properties`).
- `application-production.properties` still uses H2, but also adds deployed-frontend CORS origins and disables the H2 console.

## Developer workflow
- Use the Maven wrapper from the backend directory:
  ```powershell
  cd springmart-backend
  .\mvnw.cmd test
  ```
  or on Unix-like shells:
  ```bash
  cd springmart-backend
  ./mvnw test
  ```
- Package the app with:
  ```powershell
  cd springmart-backend
  .\mvnw.cmd clean package -DskipTests
  ```
  when you need the runnable JAR.
- Docker build/run flow is documented in `README_DOCKER.md` and uses the root `Dockerfile` plus `docker-compose.yml`.

## Test style already in the repo
- `src/test/java/com/backend/springmart/service/ProductServiceTest.java` uses Mockito with `@ExtendWith(MockitoExtension.class)` to test service logic without Spring or a database.
- `SpringMartApplicationTests` is a smoke test that only verifies the Spring context starts.

## When making changes
- Keep JPQL queries aligned with entity field names, not database column names.
- Coordinate any database/profile change across `application.properties`, `application-docker.properties`, `application-production.properties`, and the Docker files.
- Prefer preserving the current layering and field-injection style unless you are intentionally refactoring the whole module.

