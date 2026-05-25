# 🛒 SpringMart

SpringMart is a full-stack e-commerce showcase application built with a robust **Spring Boot** backend and a modern **React** frontend. It serves as a production-grade demonstration of full-CRUD product management, advanced search capabilities, image upload/retrieval, and elegant responsive web design.

---

## ✨ Features at a Glance

*   **📦 Full CRUD Management**: Easily create, view, update, and delete products.
*   **🔍 High-Performance Search**: Customized JPQL keyword search traversing product names, descriptions, categories, and brands.
*   **🖼️ Image Handling**: Real-time image upload and retrieval, served directly as raw bytes with matching content types.
*   **⚡ Paginated Listings**: Fast, memory-efficient paginated product browsing on both frontend and backend.
*   **🐳 Containerized Dev**: Fully configured Docker and Docker Compose environment for seamless local runs.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Backend** | Java 21, Spring Boot 3.4.5, Spring Data JPA, Maven, H2 (on-disk / memory) |
| **Frontend** | React 19, React Router, Sass (Modules), React Toastify, React Icons |
| **Deployment** | Docker, Netlify, Render |

---

## 📁 Project Structure

```text
SpringMart/
├── springmart-backend/       # Spring Boot REST API & Persistence Layer
├── springmart-frontend/      # React SPA Client Application
├── Dockerfile                # Multi-stage Dockerfile for Backend Deployment
├── docker-compose.yml        # Docker Compose Configuration for Monorepo
├── render.yaml               # Render Backend Deployment Descriptor
└── netlify.toml              # Netlify Frontend Deployment Descriptor
```

---

## 🚀 Getting Started

### 1. Run the Backend

```bash
cd springmart-backend
./mvnw spring-boot:run
```

*   **API URL**: `http://localhost:8080`
*   **H2 Console**: `http://localhost:8080/h2-console`
*   *Note: On startup, a demo database is seeded automatically with 9 sample products and high-quality images.*

### 2. Run the Frontend

```bash
cd springmart-frontend
npm install
npm start
```

*   **App URL**: `http://localhost:3000`
*   *Note: The frontend is configured to automatically route requests to the local backend during development.*

---

## 🔌 API Reference

All backend API endpoints are exposed under `/api` and handle JSON or multipart requests:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Retrieve paginated list of products |
| `/api/products/{id}` | `GET` | Get detailed information for a single product |
| `/api/products/search` | `GET` | Search products by name, description, brand, or category |
| `/api/products` | `POST` | Create a new product (handles `multipart/form-data`) |
| `/api/products/{id}` | `PUT` | Update fields / image of an existing product |
| `/api/products/{id}` | `DELETE` | Delete a product |
| `/api/products/image/{id}` | `GET` | Retrieve the product image bytes with appropriate MIME type |

---

## 🏛️ Architecture & Clean Code

*   **Separation of Concerns**: Strictly follows the `Controller -> Service -> Repository -> JPA Entity` request flow.
*   **Thin Controllers**: HTTP mapping and request schema mapping (`ProductRequest` DTO) are decoupled from the core business layer.
*   **Robust Service Layer**: The `ProductService` encapsulates validation, partial update logic, and smart image state preservation.
*   **Clean JPA Queries**: A single, custom JPQL query handles flexible keyword matches across multiple entity attributes.

---

## 🌐 Production Deployment

The project is pre-configured for automated, cloud-based deployments:
*   **Backend**: Deployed via **Render** using the root `render.yaml` and `Dockerfile`.
*   **Frontend**: Deployed via **Netlify** using the root `netlify.toml` for optimized SPA routing.
