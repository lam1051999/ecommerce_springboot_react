# Shopdunk clone

- Live URL: http://54.255.242.120/

A fullstack ecommerce website with ReactJs, Spring Boot, Nginx, Docker. Data is crawled with Selenium, from: https://shopdunk.com/

---

### Design architecture

![Architecture](./images/shopdunk_flow.jpeg "Architecture")

### Installation

1. Build docker images

```bash
sh make_build.sh production
```

2. Run containers

```bash
sh make_run.sh production
```

3. Initialize database

```bash
sh make_data.sh
```
