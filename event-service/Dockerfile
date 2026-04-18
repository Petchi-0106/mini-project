FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy full project
COPY . .

# Go into event-service folder
WORKDIR /app/event-service

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build project
RUN mvn clean install -DskipTests

# Run jar
CMD ["sh", "-c", "java -jar target/*.jar"]
