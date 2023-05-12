FROM maven:3.8.6-eclipse-temurin-17 AS builder
WORKDIR /build
COPY backend/pom.xml .
RUN mvn -B -f pom.xml dependency:go-offline
COPY backend/src ./src
RUN mvn clean package -Dmaven.test.skip

FROM eclipse-temurin:17.0.5_8-jre as backend
WORKDIR /opt/app
COPY --from=builder /build/target/rest-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM node:16-alpine as frontend
WORKDIR /opt/app
COPY frontend .
RUN yarn install --network-timeout 1000000
RUN yarn run build

FROM nginx:1.23-alpine as nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend /opt/app/dist /www/build