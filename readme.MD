# Shopdunk clone

- Live URL: http://54.255.242.120/

A fullstack ecommerce website with ReactJs, Spring Boot, Nginx, Docker. Data is crawled with Selenium, from: https://shopdunk.com/

---

### Design architecture

![Architecture](./images/shopdunk_flow.jpeg "Architecture")

### Database design

![Database](./images/database.png "Database")

### Installation

1. Build docker images

```bash
bash make_build.sh production
```

2. Run containers

```bash
bash make_run.sh production
```

3. Initialize database

```bash
bash make_data.sh
```
