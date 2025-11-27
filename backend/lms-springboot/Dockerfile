FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/lms-springboot-1.0.jar app.jar
EXPOSE 8078
ENTRYPOINT ["java", "-jar", "app.jar"]
