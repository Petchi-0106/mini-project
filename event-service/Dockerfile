# Use Java 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build the project
RUN mvn clean install -DskipTests

# Run the app
CMD ["java", "-jar", "target/*.jar"]
