FROM openjdk:11-jre-slim
WORKDIR /usr/share/app
COPY ./target/giphermanager-0.0.1-SNAPSHOT.jar gipher.jar
EXPOSE 9090
ENV MONGO_DB=gipherservice_db
ENTRYPOINT ["java","-jar", "gipher.jar"]
