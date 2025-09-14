# Multi-stage build for Spring Boot application  
  
# Build stage  
FROM openjdk:21-jdk-slim AS build  
  
# Set the working directory  
WORKDIR /app  
  
# Copy Maven wrapper and configuration files  
COPY springmart-backend/mvnw .  
COPY springmart-backend/.mvn .mvn  
  
# Copy the main pom.xml file  
COPY springmart-backend/pom.xml .  
  
# Make the Maven wrapper executable  
RUN chmod +x ./mvnw  
  
# Download dependencies first  
RUN ./mvnw dependency:go-offline -B  
  
# Copy the source code  
COPY springmart-backend/src src  
  
# Build the application  
RUN ./mvnw clean package -DskipTests  
  
# Production stage  
FROM eclipse-temurin:21-jre-alpine  
  
# Set the working directory  
WORKDIR /app  
  
# Copy the jar file from the build stage  
COPY --from=build /app/target/springmart-0.0.1-SNAPSHOT.jar app.jar  
  
# Expose the port the app runs on  
EXPOSE 8080  
  
# Run the application  
ENTRYPOINT ["java", "-jar", "app.jar"] 
