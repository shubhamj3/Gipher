FROM openjdk:11-jre-slim
WORKDIR /usr/share/app
COPY ./target/servicediscovery-0.0.1-SNAPSHOT.jar gipher.jar
EXPOSE 8761
ENTRYPOINT ["java","-jar", "gipher.jar"]
