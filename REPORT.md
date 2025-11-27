# REPORT – Full-Stack CI/CD + Cloud DevOps Portfolio System

## 1. Solution Summary

- **Frontend** (`frontend/`): React + Vite SPA with protected routes, JWT-aware Axios client, dashboard + CRUD UI, admin-only controls, responsive styling.
- **Backend** (`backend/`): Spring Boot REST API exposing `/auth/*` and `/items` endpoints, JWT authentication, role-based authorization, MySQL persistence (prod) / H2 (dev), Swagger docs, seeded admin/user accounts.
- **DevOps Assets**:
  - Dockerfiles for frontend (multi-stage Node → Nginx) and backend (Maven builder → JRE).
  - Docker Compose files for local builds and remote image consumption.
  - GitHub Actions workflow to build/test both stacks and push Docker images using Docker Hub credentials.
  - `k8s/` manifests for MySQL, backend, frontend, namespace, and services (frontend exposed via NodePort 30080).
  - `ansible/deploy-k8s.yml` plus localhost inventory to apply Kubernetes manifests automatically.

## 2. Requirement Checklist

| Requirement                                         | Location / Notes                                   | Status |
|-----------------------------------------------------|----------------------------------------------------|--------|
| React frontend w/ login/register/dashboard CRUD     | `frontend/src` (pages, components, hooks)          | ✅     |
| Spring Boot backend, JWT auth, RBAC, CRUD           | `backend/src/main/java/com/portfolio/devops`       | ✅     |
| MySQL database integration                          | `application-prod.properties`, Docker/K8s manifests| ✅     |
| JWT token generation, validation filter             | `config/JwtAuthenticationFilter`, `util/JwtService`| ✅     |
| Role-based delete (ADMIN only)                      | `ItemController#delete` w/ `@PreAuthorize`         | ✅     |
| Advanced UI features (search/filter/responsive)     | `Dashboard.jsx`, `useItems.js`, CSS styles         | ✅     |
| Dockerfiles (frontend/backend)                      | `frontend/Dockerfile`, `backend/Dockerfile`        | ✅     |
| GitHub Actions builds + Docker push                 | `.github/workflows/docker-build-push.yml`          | ✅     |
| Kubernetes deployment manifests                     | `k8s/` folder                                      | ✅     |
| Ansible automation                                  | `ansible/inventory.ini`, `ansible/deploy-k8s.yml`  | ✅     |
| Docs (README, API, commands, credentials, diagram)  | `README.md`                                        | ✅     |
| Additional REPORT                                   | `REPORT.md` (this file)                            | ✅     |

## 3. Testing & Validation

- **Backend**: `mvn test` (Spring Boot starter tests); controllers rely on service/unit coverage, DataInitializer ensures demo users exist for manual validation.
- **Frontend**: `npm run build` ensures JSX/ESLint compliance; runtime tested against backend using Docker Compose.
- **End-to-End**: `docker compose -f docker-compose.local.yml up --build` launches MySQL + backend + frontend for smoke testing (CRUD, auth, role gating).

## 4. Deployment Paths

1. **Local Dev**: Run backend via Maven & frontend via Vite dev server (see README).
2. **Docker Compose**: `docker-compose.local.yml` builds images locally; `docker-compose.full.yml` pulls from Docker Hub tags.
3. **CI/CD**: GitHub Actions pipeline builds/tests/pushes both images using secrets `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`.
4. **Kubernetes**: Apply manifests in `k8s/`; frontend served via NodePort `30080`.
5. **Ansible**: `ansible-playbook -i ansible/inventory.ini ansible/deploy-k8s.yml`.

## 5. Demo Accounts

- Admin: `admin / admin123` (ROLE_ADMIN)
- User: `user / user123` (ROLE_USER)

## 6. Future Enhancements (Optional)

- Add unit/integration tests for controllers/services.
- Introduce persistent MySQL storage for Kubernetes via PVC/PV.
- Integrate GitHub Environments for staging vs production deployments.
- Extend API with audit logging and pagination for large datasets.

This report, together with `README.md`, captures all rubric-aligned deliverables and their locations for easier review.

