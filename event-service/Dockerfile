FROM eclipse-temurin:17-jdk

WORKDIR /app
COPY . .

WORKDIR /app/event-service

RUN apt-get update && apt-get install -y maven
RUN mvn clean install -DskipTests

CMD ["sh", "-c", "java -jar target/*.jar"]
