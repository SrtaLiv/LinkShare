FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/LinkShare-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_linkshare.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app_linkshare.jar"]
