FROM eclipse-temurin:17-jdk

# Set root
WORKDIR /app

# Copy full project
COPY . .

# Move to correct service folder
WORKDIR /app/event-service

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build
RUN mvn clean install -DskipTests

# Run
CMD ["sh", "-c", "java -jar target/*.jar"]
