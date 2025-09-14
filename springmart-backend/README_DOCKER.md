# SpringMart Backend Docker Setup

This document provides instructions for building and running the SpringMart backend application using Docker.

## Prerequisites

1. Docker Desktop installed on your system
2. Docker Compose (included with Docker Desktop)

## Building the Docker Image

To build the Docker image, run the following command from the project root directory:

```bash
docker build -t springmart-backend .
```

## Running with Docker

### Using Docker Run

```bash
docker run -p 8080:8080 springmart-backend
```

### Using Docker Compose

```bash
docker-compose up
```

## Project Structure

The Docker setup uses a multi-stage build process:

1. **Build Stage**: Uses Maven to build the Spring Boot application
2. **Production Stage**: Copies the built JAR file to a smaller JRE image

## Configuration

The application uses the following configuration files:
- `application.properties`: Default configuration
- `application-docker.properties`: Docker-specific configuration (activated with SPRING_PROFILES_ACTIVE=docker)

## Data Persistence

When running with Docker, the H2 database files are stored in the `/app/data` directory inside the container. To persist data between container restarts, a volume is mounted to the `./data` directory on the host.

## Troubleshooting

### Common Issues

1. **Docker not found**: Make sure Docker Desktop is installed and running
2. **Build failures**: Ensure all required files are present in the project directory
3. **Port conflicts**: If port 8080 is already in use, change the port mapping in docker-compose.yml

### Build Issues

If you encounter build issues, try:
1. Cleaning the Maven build: `./mvnw clean`
2. Rebuilding the Docker image with no cache: `docker build --no-cache -t springmart-backend .`

## Files

- `Dockerfile`: Multi-stage Docker build configuration
- `docker-compose.yml`: Docker Compose configuration
- `.dockerignore`: Specifies files to exclude from the Docker build context
- `application-docker.properties`: Docker-specific application configuration