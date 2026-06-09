# ✈️ Airline Booking System – Full Stack CI/CD Project

A full-stack airline booking platform with automated CI/CD pipeline using Jenkins, Docker, and GitHub Webhooks.

---

## 🚀 Tech Stack

**Frontend**

* React (Vite)
* TailwindCSS

**Backend**

* Node.js
* Express.js
* Prisma ORM

**Database & Cache**

* PostgreSQL (or your DB)
* Redis (for workers & queues)

**DevOps**

* Docker & Docker Compose
* Jenkins CI/CD
* GitHub Webhooks
* Nginx Reverse Proxy

**Monitoring**

* Prometheus
* Grafana

---

## 🏗️ System Architecture

```
GitHub → Jenkins → Docker Compose → API + Workers + Redis + Nginx
```

Frontend:

```
React App → API Gateway (Nginx) → Backend Services
```

---

## 📸 Screenshots

### 🔧 Jenkins CI/CD Pipeline

![Jenkins Pipeline](./assets/jenkins.png)

### 🐳 Docker Containers Running

![Docker PS](./assets/docker.png)

### 📊 Grafana Dashboard

![Grafana](./assets/grafana.png)

### 🌐 Application UI

![Frontend](./assets/frontend.png)

---

## ⚙️ How to Run Locally

### Backend + Services

```bash
docker-compose up -d --build
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔥 CI/CD Pipeline

Every push to GitHub triggers:

1. Jenkins build
2. Dependency installation
3. Lint checks
4. Docker build
5. Automated deployment via Docker Compose

---

## 📈 Features

* Flight booking API
* Background workers (email + payments)
* Redis queue processing
* Reverse proxy with Nginx
* Monitoring with Grafana dashboards
* Fully automated CI/CD pipeline

---

## 🧠 What I Learned

* Docker container orchestration
* Jenkins pipeline automation
* Webhook-based CI/CD
* Microservice-style architecture
* Monitoring & observability setup

---

## 📌 Status

✔ Backend complete
✔ CI/CD pipeline working
✔ Monitoring integrated
✔ Frontend local (dev mode)

---

## 📫 Author

Kartik Bilagi
LinkedIn: https://linkedin.com/in/your-profile
GitHub: https://github.com/your-profile
