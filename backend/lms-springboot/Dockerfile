# Use stable Temurin base image
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app
COPY target/lms-springboot-1.0.jar app.jar
EXPOSE 8078

ENTRYPOINT ["java", "-jar", "app.jar"]
