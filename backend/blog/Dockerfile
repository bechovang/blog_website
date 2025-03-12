# Use Eclipse Temurin (OpenJDK) as base image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy the project files (adjust if using Gradle)
COPY target/*.jar app.jar


# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]