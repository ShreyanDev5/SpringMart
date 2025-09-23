# 🛒 SpringMart - Full-Stack E-Commerce Platform

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white)](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.5-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.5-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

> A modern, full-stack e-commerce platform showcasing robust backend development with Spring Boot and a sleek frontend with React. This project serves as a key artifact in my portfolio, demonstrating my journey toward becoming a world-class software developer.

---

## 🎯 Project Purpose

SpringMart is not just another e-commerce platform—it's a comprehensive showcase of my full-stack development skills, architectural decisions, and commitment to building production-ready applications. This project represents my growth as a developer and demonstrates my ability to create scalable, maintainable, and well-documented software.

---

## 🚀 Key Features

- **Backend**: RESTful API built with Spring Boot (Java 21) and PostgreSQL
- **Frontend**: Modern UI with React 19, TailwindCSS, and Framer Motion
- **Database**: PostgreSQL for production with H2 for development
- **Containerization**: Docker support for consistent deployment
- **Deployment**: Backend on Render, Frontend on Netlify
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Image Management**: Binary image storage and retrieval
- **Search Functionality**: Product search across multiple fields
- **Validation**: Comprehensive input validation with Spring Validation

---

## 🏗️ Architecture Overview

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.4.5
- **Language**: Java 21
- **Database**: PostgreSQL (Production), H2 (Development)
- **Build Tool**: Maven
- **Key Components**:
  - RESTful API with proper HTTP status codes
  - JPA/Hibernate for data persistence
  - Lombok for boilerplate reduction
  - Validation with Bean Validation
  - CORS configuration for frontend integration

### Frontend (React)
- **Framework**: React 19 with functional components and hooks
- **Styling**: TailwindCSS 4.0 for utility-first styling
- **Routing**: React Router v7
- **State Management**: Built-in React state with potential for Redux integration
- **Animations**: Framer Motion for smooth transitions
- **Notifications**: React Toastify for user feedback
- **Modals**: React Modal for overlay components
- **Icons**: React Icons library

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Backend** | Java 21 | Primary programming language |
| | Spring Boot 3.4.5 | Framework for building RESTful APIs |
| | PostgreSQL | Production database |
| | H2 Database | Development database |
| | Maven | Build automation tool |
| | Lombok | Reduces boilerplate code |
| **Frontend** | React 19 | JavaScript library for UI |
| | TailwindCSS 4.0 | Utility-first CSS framework |
| | Axios | HTTP client for API requests |
| | React Router v7 | Declarative routing |
| | Framer Motion | Animation library |
| **DevOps** | Docker | Containerization |
| | Render | Backend deployment |
| | Netlify | Frontend deployment |
| | GitHub Actions | CI/CD (planned) |

---

## 📁 Project Structure

```bash
springmart/
├── springmart-backend/     # Spring Boot application
│   ├── src/main/java/     # Java source files
│   │   └── com/backend/springmart/
│   │       ├── controller/ # REST controllers
│   │       ├── model/      # Entity models
│   │       ├── repository/ # JPA repositories
│   │       ├── service/    # Business logic
│   │       └── SpringMartApplication.java
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven configuration
├── springmart-frontend/   # React application
│   ├── public/            # Static assets
│   ├── src/               # React components
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── docker-compose.yml     # Multi-container setup
├── Dockerfile             # Backend containerization
├── render.yaml            # Render deployment config
├── netlify.toml           # Netlify deployment config
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Java 21
- Node.js >= 20.0.0
- PostgreSQL (for production)
- Docker (optional, for containerization)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd springmart-backend
   ```

2. Configure database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/springmart
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd springmart-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Using Docker

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

---

## 🌐 API Endpoints

All endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/products` | Get all products (paginated) |
| GET | `/products/{id}` | Get product by ID |
| GET | `/products/image/{id}` | Get product image |
| GET | `/products/search` | Search products by keyword |
| POST | `/products` | Create new product |
| PUT | `/products/{id}` | Update product |
| DELETE | `/products/{id}` | Delete product |

---

## 🎨 Frontend Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Product Gallery**: Displays products with images and details
- **Search Functionality**: Find products by name, category, or brand
- **Product Management**: Add, update, and delete products
- **Image Upload**: Attach images to products
- **Toast Notifications**: User feedback for actions
- **Modal Dialogs**: Confirmation for destructive actions
- **Smooth Animations**: Enhanced user experience with Framer Motion

---

## 📊 Data Model

### Product Entity

| Field | Type | Constraints |
|-------|------|-------------|
| id | Long | Auto-generated |
| name | String | @NotBlank, max 100 chars |
| price | Integer | @Min(0) |
| category | String | @NotBlank |
| brand | String | @NotBlank |
| description | String | Optional, max 500 chars |
| quantity | Integer | Optional, @Min(0) |
| inStock | Boolean | Optional |
| releaseDate | LocalDate | Optional |
| imageName | String | Optional |
| imageType | String | Optional |
| imageData | byte[] | Optional |

---

## 🚀 Deployment

### Backend (Render)
The backend is configured for deployment on Render using Docker:
- Docker image built from `Dockerfile`
- PostgreSQL database connection via environment variables
- Automatic deployment with `render.yaml`

### Frontend (Netlify)
The frontend is configured for deployment on Netlify:
- Build command: `npm run build`
- Publish directory: `build/`
- Environment: Node 20

---

## 🧪 Testing

### Backend Testing
- Unit tests with JUnit 5
- Integration tests with Spring Boot Test
- Repository tests for data layer

Run tests with:
```bash
./mvnw test
```

### Frontend Testing
- Component tests with React Testing Library
- Unit tests with Jest

Run tests with:
```bash
npm test
```

---

## 🛡️ Security Considerations

While this is a demonstration project, security best practices have been considered:
- Input validation on both frontend and backend
- Proper HTTP status codes for error handling
- CORS configuration for controlled access
- No sensitive data stored in repository

For production use, additional security measures would be implemented:
- Authentication and authorization (JWT/OAuth)
- HTTPS enforcement
- Input sanitization
- Rate limiting
- Database connection pooling

---

## 📈 Future Enhancements

As part of my continuous learning journey, I plan to implement:
- User authentication and authorization
- Shopping cart functionality
- Order management system
- Payment integration (Stripe/PayPal)
- Advanced search with filters
- Product reviews and ratings
- Admin dashboard
- CI/CD pipeline with GitHub Actions
- Caching with Redis
- API documentation with Swagger

---

## 📚 Learning Outcomes

This project has been instrumental in my development journey, teaching me:
- Full-stack application architecture
- RESTful API design principles
- Database modeling and relationships
- Containerization with Docker
- Cloud deployment strategies
- Modern frontend development with React
- Project documentation and maintenance
- Git workflow and version control

---

## 🤝 Contributing

As this is a portfolio project, contributions are not actively sought. However, I welcome feedback and suggestions for improvement as part of my learning process.

---

## 👤 Author

**Shreyan Sardar** - *Java Developer*

This project represents my commitment to becoming a world-class software developer through continuous learning, practical application, and attention to detail.

- **Backend Development**: Independently developed the complete Spring Boot backend with RESTful APIs, database integration, and business logic
- **Frontend Development**: Built with assistance from AI tools including Cursor, Windsurf, Gemini CLI, and Qwen CLI to accelerate design and implementation

---

## 📝 License

This project is for educational and portfolio purposes only. It is not licensed for commercial use.

---

## 🙏 Acknowledgments

- Spring Boot documentation and community
- React documentation and community
- All developers who contributed to the open-source libraries used in this project