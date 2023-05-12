# 1. Introduction

A fullstack ecommerce website with ReactJs, Spring Boot, Nginx, Docker. Data is crawled with Selenium, from: https://shopdunk.com/

# 2. Installation

## 2.1. Build docker images

```bash
sh make_build.sh production
```

## 2.2. Run containers

```bash
sh make_run.sh
```

## 2.3. Initialize database

```bash
sh make_data.sh
```

Go to http://localhost:8888/
