# Use Java 21 base image
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY springmart-backend/springmart/mvnw .
COPY springmart-backend/springmart/.mvn .mvn
COPY springmart-backend/springmart/pom.xml .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Copy source code
COPY springmart-backend/springmart/src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/springmart-0.0.1-SNAPSHOT.jar"] 