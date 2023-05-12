# 1. Introduction

A fullstack ecommerce website with ReactJs, Spring Boot, Nginx, Docker. Data is crawled with Selenium, from: https://shopdunk.com/

# 2. Installation

## 2.1. Build docker images

```bash
sh build.sh production
```

## 2.2. Run containers

```bash
docker-compose up -d
```

## 2.3. Initialize database

```bash
sh init_data.sh
```

Go to http://localhost:8888/
