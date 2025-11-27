# ====== BUILD STAGE ======
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# copy pom + sources
COPY pom.xml .
COPY src ./src

# build jar
RUN mvn clean package -DskipTests

# ====== RUNTIME STAGE ======
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Spring Boot port
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
