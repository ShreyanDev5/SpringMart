# <img src="public/logo.svg" width="28" height="28" style="vertical-align: middle;" /> SpringMart

SpringMart is a full-stack e-commerce app featuring a Spring Boot backend and a React frontend. It provides product management, multi-field search, pagination, and image uploads.

---

## ✨ Features

*   **Product CRUD**: Create, view, update, and delete products.
*   **Search**: Query products by name, description, category, or brand with a custom JPQL query.
*   **Image Uploads**: Store and retrieve images as raw bytes.
*   **Pagination**: Handled on both frontend and backend for list views.
*   **Docker**: Preconfigured environment for running the backend.

---

## 📸 Preview

| Home Page | Product Details | Add / Edit Product |
| :---: | :---: | :---: |
| <img src="public/home_page.png" width="280" alt="Home Page"> | <img src="public/product_page.png" width="280" alt="Product Details"> | <img src="public/add_page.png" width="200" alt="Add Product"> |

---

## 🛠️ Tech Stack

*   **Backend**: Java 21, Spring Boot 3.4.5, Spring Data JPA, H2, Maven
*   **Frontend**: React 19, React Router, Sass, React Toastify, React Icons
*   **AI Tools**: Cursor, Windsurf, Codex, GitHub Copilot, Antigravity
*   **Deployment**: Docker, Netlify, Render

---

## 📁 Structure

*   `springmart-backend/` – Spring Boot REST API
*   `springmart-frontend/` – React frontend SPA
*   `docker-compose.yml` & `Dockerfile` – Docker setup for backend
*   `render.yaml` & `netlify.toml` – Production deployment configurations

---

## 🚀 Setup

### Prerequisites
*   **Java 21**
*   **Node.js 20+**

### Backend
```bash
cd springmart-backend
# Windows
.\mvnw.cmd spring-boot:run

# macOS/Linux
chmod +x mvnw && ./mvnw spring-boot:run
```
*   **API**: `http://localhost:8080` (H2 Console: `/h2-console`)
*   *Note: Seeds demo products on startup if the database is empty.*

### Frontend
```bash
cd springmart-frontend
npm install && npm start
```
*   **App**: `http://localhost:3000`

### Docker (Backend)
```bash
docker compose up --build
```

---

## 🔌 API

All endpoints are prefixed with `/api`:

*   `GET /products` – Get paginated products
*   `GET /products/{id}` – Get product details
*   `GET /products/search?keyword=...` – Search products
*   `POST /products` – Create product (multipart)
*   `PUT /products/{id}` – Update product (multipart)
*   `DELETE /products/{id}` – Delete product
*   `GET /products/image/{id}` – Retrieve product image

---

## 🏛️ Architecture

*   **Design**: Clean layered architecture (`Controller -> Service -> Repository -> JPA Entity`).
*   **Data Flow**: Controller maps HTTP requests to DTOs before business logic execution.
*   **Service Layer**: Handles validation, merging, and image preservation.
*   **Search**: Custom JPQL query for case-insensitive keyword search across multiple fields.

---

## 🌐 Deployment

*   **Backend**: Render (`render.yaml`)
*   **Frontend**: Netlify (`netlify.toml`)

---

> **Note**: The frontend of this project was built using AI tools.
