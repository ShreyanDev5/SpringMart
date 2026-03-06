# SpringMart

SpringMart is a full-stack e-commerce showcase with a Spring Boot backend and a React frontend. The application supports product browsing, product search, create/edit/delete flows, image upload, and responsive product views.

## At a Glance

- Full CRUD product management.
- Product search and paginated product listing.
- Image upload and image retrieval.
- Separate backend and frontend apps inside one monorepo.

## Authorship

- I fully implemented the backend myself.
- The frontend was generated using AI models, then integrated, cleaned up, and reorganized in this repository.

## Stack

| Layer      | Tech                                         |
| ---------- | -------------------------------------------- |
| Backend    | Java 21, Spring Boot, Maven, PostgreSQL, H2  |
| Frontend   | React 19, React Router, Sass, React Toastify |
| Deployment | Docker, Render, Netlify                      |

## Repository Layout

```text
SpringMart/
├── springmart-backend/
├── springmart-frontend/
├── docker-compose.yml
├── Dockerfile
├── render.yaml
└── netlify.toml
```

- `springmart-backend`: Spring Boot API, persistence layer, and business logic.
- `springmart-frontend`: React client application.

## What Recruiters Should Know

- The backend is the core engineering work in this project.
- It exposes REST endpoints for product management and image delivery.
- The frontend demonstrates the full product workflow against that backend.
- The repo is organized as a monorepo for simpler local development and deployment.

## Run Locally

### Backend

```bash
cd springmart-backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd springmart-frontend
npm install
npm start
```

The frontend expects the backend API at `http://localhost:8080` during local development.

## API Summary

All application endpoints are under `/api`.

- `GET /products`
- `GET /products/{id}`
- `GET /products/search`
- `POST /products`
- `PUT /products/{id}`
- `DELETE /products/{id}`
- `GET /products/image/{id}`

## Deployment

- Backend deployment is configured for Render.
- Frontend deployment is configured for Netlify.
