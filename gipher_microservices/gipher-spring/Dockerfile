FROM openjdk:11-jre-slim
WORKDIR /usr/share/app
COPY ./target/GipherBackend-0.0.1-SNAPSHOT.jar gipher.jar
EXPOSE 8000
ENV MYSQL_DB=user_register
ENV JWT_SECRET=secretkey
ENTRYPOINT ["java","-jar", "gipher.jar"]
