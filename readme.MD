# Shopdunk clone

- Live URL: http://54.255.242.120/

A fullstack ecommerce website with ReactJs, Spring Boot, Nginx, Docker. Data is crawled with Selenium, from: https://shopdunk.com/.

---

### Design architecture

![Architecture](./images/shopdunk_flow.jpeg "Architecture")

### Database design

![Database](./images/database.png "Database")

#### Project overview

- Backend
  - Spring Boot
- Frontend
  - ReactJs (Typescript)
- Database
  - MySQL
- Deployment
  - CI/CD with Github Actions
  - Docker, Docker Compose
- Crawler
  - Selenium

---

### How to deploy production

Clone project to the production server.

Edit `./nginx/urls/urls_production.js` with your production hosting server URL.

Set up GitHub Actions secret to match your keys.

Commit changes to the main branch as it will trigger the GitHub Actions workflow to build the docker images and restart docker-compose commands.

If it is your first run, then initialize data by running

```bash
bash make_data.sh
```

### How to deploy locally

Edit `./script/env.sh` to match your keys

```bash
source ./script/env.sh && bash ./script/build.sh development
bash make_run.sh development
bash make_data.sh
```

Go to `http://localhost`
