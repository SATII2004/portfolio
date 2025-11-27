# Full-Stack CI/CD + Cloud DevOps Portfolio System

A production-ready reference stack showcasing secure CRUD APIs, React UI, Dockerized delivery, GitHub Actions CI/CD, Kubernetes deployment assets, and Ansible automation. Everything lives under `PORTFOLIO/` so you can copy the folder and run locally or in-cluster.

## Overview

- **Frontend**: Vite + React 18, protected routes, JWT-aware Axios client, responsive dashboard with search/filter, role-aware admin controls.
- **Backend**: Spring Boot 3 / Java 17 REST API with JWT authentication, role-based authorization (`ROLE_USER`, `ROLE_ADMIN`), MySQL persistence, H2-powered dev profile.
- **DevOps**: Dockerfiles for frontend/backend, GitHub Actions workflow that builds/tests both apps and pushes Docker images, Kubernetes manifests for a full stack (frontend NodePort 30080), and an Ansible playbook that applies the manifests.

## Feature Highlights

- JWT login/register with BCrypt hashing and persistent roles.
- CRUD Item management (title, description, createdAt) with search + sorting/filter UI.
- Role-aware UI & API: admins can delete, regular users cannot.
- Responsive dashboard, dark-glass style UI, Hindi + English messaging to demonstrate localization.
- Auto-seeded demo users (`admin/admin123`, `user/user123`).
- Swagger/OpenAPI enabled for quick API exploration.

## Architecture

```
             +---------------------+              +------------------+
             |  React Frontend     |  Axios JWT   |  Spring Boot API |
   Browser <->  (Vite, Nginx img)  | <----------> |  (JWT, RBAC)     |
             |  Protected Routes   |              |  CRUD + Security |
             +----------+----------+              +---------+--------+
                        |                                 |
                        | REST (ClusterIP / Service)      | JPA
                        v                                 v
                   +----+---------------------------------+----+
                   |           MySQL 8 Stateful DB             |
                   +-------------------------------------------+

CI/CD: GitHub Actions → Docker build/push (frontend/backend) → Docker Hub  
Kubernetes: `k8s/` manifests deploy mysql + backend + frontend (NodePort 30080) in `portfolio` namespace  
Automation: `ansible/deploy-k8s.yml` executes `kubectl apply -f k8s/`
```

## Tech Stack

- **Frontend**: React 18, React Router 6, Axios, Vite, CSS modules.
- **Backend**: Spring Boot 3.3, Spring Security, Spring Data JPA, H2 (dev), MySQL (prod), jjwt, Lombok.
- **Database**: MySQL 8 (Docker/K8s) + H2 in-memory for dev profile.
- **CI/CD & Ops**: Docker, Docker Compose, GitHub Actions, Kubernetes, Ansible.

## Local Development

### Prerequisites

- Node.js 20+, npm
- Java 17+, Maven 3.9+
- Docker Desktop (optional but recommended)
- MySQL 8 (if running services without containers)

### Run everything with Docker Compose

```bash
# from PORTFOLIO/
docker compose -f docker-compose.local.yml up --build
```

- Frontend: http://localhost:5173 (served by Nginx)
- Backend: http://localhost:8080
- MySQL: localhost:3306 (`root` / `password`)

`docker-compose.full.yml` expects prebuilt Docker Hub images (change `DOCKERHUB_USERNAME` env to yours) and exposes frontend on port 4173.

### Manual workflow (optional)

1. Start MySQL locally and create `portfolio_db`.
2. Backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Access the app via http://localhost:5173 (proxying to backend at 8080).

## Environment Variables

| Service   | Variable             | Purpose / Default                                          |
|-----------|----------------------|-------------------------------------------------------------|
| Backend   | `SPRING_PROFILES_ACTIVE` | `dev` (default) or `prod`                                 |
| Backend   | `DB_URL`/`DB_USERNAME`/`DB_PASSWORD` | MySQL connection (prod profile)        |
| Backend   | `JWT_SECRET`, `JWT_EXPIRATION`       | JWT signing + lifetime                 |
| Frontend  | `VITE_API_URL`        | Base URL for Axios (defaults to `http://localhost:8080`)   |
| Docker/K8s | `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN` | Used by GitHub Actions workflow     |

## API Reference

| Method | Endpoint         | Auth | Description                      |
|--------|------------------|------|----------------------------------|
| POST   | `/auth/register` | ❌   | Create User + auto-login reply   |
| POST   | `/auth/login`    | ❌   | Authenticate, return JWT + role  |
| GET    | `/items?q=`      | ✅   | List items, optional search      |
| POST   | `/items`         | ✅   | Create item                      |
| PUT    | `/items/{id}`    | ✅   | Update item                      |
| DELETE | `/items/{id}`    | ✅ `ROLE_ADMIN` | Delete item (admin only) |

Swagger: `http://localhost:8080/swagger-ui/index.html`

## Demo Credentials

- Admin: `admin / admin123`
- User: `user / user123`

## Docker Images

- Build locally:
  ```bash
  docker build -t portfolio-backend:dev ./backend
  docker build -t portfolio-frontend:dev ./frontend
  ```
- Push via GitHub Actions `.github/workflows/docker-build-push.yml` (requires secrets `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`).

## Kubernetes Deployment

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mysql-deployment.yaml -f k8s/mysql-service.yaml
kubectl apply -f k8s/backend-deployment.yaml -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml -f k8s/frontend-service.yaml
```

- Namespace: `portfolio`
- Frontend NodePort: `30080`
- Update `DOCKERHUB_USERNAME` env (or edit manifests) to point to your container registry.

## Ansible Automation

```bash
cd ansible
ansible-playbook -i inventory.ini deploy-k8s.yml
```

Assumes `kubectl` context already targets the desired cluster.

## Continuous Integration / Delivery

- Workflow: `.github/workflows/docker-build-push.yml`
  - Builds + tests backend with Maven (Java 17).
  - Builds frontend with npm/vite.
  - Logs into Docker Hub via GitHub Secrets and pushes tagged images for both services.
  - Publishes summary of pushed images.

## Testing

- Backend unit/integration tests: `cd backend && mvn test`
- Frontend lint/build: `cd frontend && npm run lint && npm run build`

## Troubleshooting

- Verify MySQL readiness and credentials if backend fails to start (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`).
- Ensure JWT secret length is strong in production.
- For Kubernetes, confirm Docker images are accessible from cluster nodes (private repos need imagePullSecrets).

---

Need help or enhancements? Open an issue or extend the modular React components / Spring services—everything is structured to be easily customizable.

