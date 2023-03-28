FROM openjdk:11-jre-slim
WORKDIR /usr/share/app
COPY ./target/api-gateway-service-0.0.1-SNAPSHOT.jar gipher.jar
EXPOSE 8765
ENTRYPOINT ["java","-jar", "gipher.jar"]
