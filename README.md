# ViralAnimalTracker

Full-stack starter.

- `backend/`: Spring Boot 3.2 + Java 17 skeleton with PostgreSQL deps.
- `frontend/`: React + Vite + TypeScript scaffold.

## Backend
1. `cd backend`
2. `mvn spring-boot:run` (configure DB in `src/main/resources/application.properties`).

## Frontend
1. `cd frontend`
2. `npm install` (uses local cache if needed: `npm_config_cache=./.npm-cache npm install`)
3. `npm run dev` (proxy to backend at http://localhost:8080 via `/api`).
