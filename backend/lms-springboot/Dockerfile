FROM openjdk:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8078
ENTRYPOINT ["java", "-jar", "app.jar"]
