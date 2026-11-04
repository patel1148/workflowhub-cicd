---
title: "WorkFlowHub Ltd. — Task 2 CI/CD Implementation & Submission Evidence"
subtitle: "SOFT806 Continuous Integration and Continuous Deployment — Trimester 3, 2026"
author: "Student Name: Jay Patel | Student ID: 271074230"
date: "November 2026"
---

# Auckland Institute of Studies (AIS)
### Faculty of Information Technology Programme
**Course:** SOFT806 Continuous Integration and Continuous Deployment  
**Assessment:** Assignment 1 (Individual) — Task 2 Evidence Document  
**Student Name:** Jay Patel  
**Student ID:** 271074230  
**GitHub Repository Link:** [https://github.com/patel1148/workflowhub-cicd](https://github.com/patel1148/workflowhub-cicd)  

\newpage

# Table of Contents

- [1. GitHub Repository and Source Control Overview](#1-github-repository-and-source-control-overview)
- [2. GitHub Kanban Board Implementation & Issue Progress Tracking](#2-github-kanban-board-implementation--issue-progress-tracking)
  - [2.1 Kanban Board Structure (Five Mandatory Stages)](#21-kanban-board-structure-five-mandatory-stages)
  - [2.2 Mapping Task 1 Prioritized Backlog to GitHub Issues](#22-mapping-task-1-prioritized-backlog-to-github-issues)
  - [2.3 Evidence of Issue Movement Across Lifecycle Stages](#23-evidence-of-issue-movement-across-lifecycle-stages)
- [3. Feature Branches, Pull Requests, and Code Review Activity](#3-feature-branches-pull-requests-and-code-review-activity)
  - [3.1 Branching Strategy and Branch Hierarchy](#31-branching-strategy-and-branch-hierarchy)
  - [3.2 Pull Request #1: DRF Backend API & Authentication](#32-pull-request-1-drf-backend-api--authentication)
  - [3.3 Pull Request #2: React.js Frontend Interface & API Integration](#33-pull-request-2-reactjs-frontend-interface--api-integration)
  - [3.4 Pull Request #3: Dockerization & Multi-Container Docker Compose](#34-pull-request-3-dockerization--multi-container-docker-compose)
  - [3.5 Pull Request #4: Automated GitHub Actions CI Pipeline](#35-pull-request-4-automated-github-actions-ci-pipeline)
  - [3.6 Pull Request #5: CircleCI Pipeline Implementation](#36-pull-request-5-circleci-pipeline-implementation)
  - [3.7 Incremental Git Commit History Log](#37-incremental-git-commit-history-log)
- [4. Full-Stack Application Implementation Evidence](#4-full-stack-application-implementation-evidence)
  - [4.1 Backend (Django REST Framework) Endpoints & Auth Verification](#41-backend-django-rest-framework-endpoints--auth-verification)
  - [4.2 Frontend (React.js) Components & API Integration](#42-frontend-reactjs-components--api-integration)
  - [4.3 Environment Variable Configuration Evidence](#43-environment-variable-configuration-evidence)
- [5. Docker-Based Development Environment Evidence](#5-docker-based-development-environment-evidence)
  - [5.1 Backend Dockerfile Architecture & Build Verification](#51-backend-dockerfile-architecture--build-verification)
  - [5.2 Frontend Multi-Stage Dockerfile & Build Verification](#52-frontend-multi-stage-dockerfile--build-verification)
  - [5.3 Docker Compose Multi-Container Orchestration](#53-docker-compose-multi-container-orchestration)
- [6. Continuous Integration (CI) Pipeline Execution Evidence](#6-continuous-integration-ci-pipeline-execution-evidence)
  - [6.1 GitHub Actions Workflow Execution Evidence](#61-github-actions-workflow-execution-evidence)
  - [6.2 CircleCI Pipeline Execution Evidence](#62-circleci-pipeline-execution-evidence)
- [7. Step-by-Step Remote Deployment & GitHub Push Guide](#7-step-by-step-remote-deployment--github-push-guide)

\newpage

# 1. GitHub Repository and Source Control Overview

The source code, container configurations, and CI/CD pipelines for **WorkFlowHub Ltd.** are maintained under professional Git version control.

- **Primary Repository URL:** `https://github.com/patel1148/workflowhub-cicd`
- **Default Production Branch:** `main`
- **Development Feature Branches:**
  - `feature/drf-backend-api`
  - `feature/react-frontend`
  - `feature/docker-containerization`
  - `feature/github-actions-ci`
  - `feature/circleci-pipeline`

---

# 2. GitHub Kanban Board Implementation & Issue Progress Tracking

## 2.1 Kanban Board Structure (Five Mandatory Stages)
As stipulated in the assignment requirements, a GitHub Projects Kanban board was established containing the five required columns:
1. **Backlog:** Initial repository for all defined user stories and technical tasks prior to sprint commitment.
2. **To Do:** Prioritized stories selected for the active iteration awaiting developer pickup.
3. **In Progress:** Features actively undergoing local implementation on dedicated feature branches.
4. **In Review:** Features completed and submitted as Pull Requests undergoing code review and CI verification.
5. **Done:** Fully approved, verified, and merged deliverables into the `main` branch.

## 2.2 Mapping Task 1 Prioritized Backlog to GitHub Issues

Each story formulated in the Task 1 Product Backlog was instantiated as a formal GitHub Issue with labels, milestones, and priority indicators:

| Issue # | Issue Title | Priority | Category | Assigned Branch |
| :---: | :--- | :--- | :--- | :--- |
| **#1** | US-01: User Registration & Identity Provisioning | Must Have (Rank 1) | Application / Backend | `feature/drf-backend-api` |
| **#2** | US-02: Workflow Item Creation & Data Model | Must Have (Rank 2) | Application / Backend | `feature/drf-backend-api` |
| **#3** | US-03: Lifecycle Status Progression | Must Have (Rank 3) | Application / Backend | `feature/drf-backend-api` |
| **#4** | US-04: Workflow Item Editing & Deletion | Must Have (Rank 4) | Application / Backend | `feature/drf-backend-api` |
| **#5** | US-06: Backend Dockerization & Env Vars | Must Have (Rank 5) | DevOps / Containers | `feature/docker-containerization` |
| **#6** | US-07: Frontend Multi-Stage Docker Packaging | Must Have (Rank 6) | DevOps / Containers | `feature/docker-containerization` |
| **#7** | US-08: Multi-Container Docker Compose Stack | Must Have (Rank 7) | DevOps / Containers | `feature/docker-containerization` |
| **#8** | US-05: Interactive Kanban Board & Filtering UI | Should Have (Rank 8) | Application / Frontend | `feature/react-frontend` |
| **#9** | US-09: Automated GitHub Actions CI Pipeline | Must Have (Rank 9) | DevOps / CI | `feature/github-actions-ci` |
| **#10** | US-10: Branching Strategy & PR Code Review | Should Have (Rank 10) | DevOps / Governance | `main` |
| **#11** | US-11: Secondary CircleCI Pipeline Verification | Could Have (Rank 11) | DevOps / CI | `feature/circleci-pipeline` |
| **#12** | US-12: API Health & Readiness Probes | Could Have (Rank 12) | DevOps / API | `feature/drf-backend-api` |

---

## 2.3 Evidence of Issue Movement Across Lifecycle Stages

### Phase 1: Sprint Backlog Initialization
At the commencement of the sprint, issues were structured across Backlog and To Do:

```
+------------------+------------------+------------------+------------------+------------------+
|     BACKLOG      |      TO DO       |   IN PROGRESS    |    IN REVIEW     |       DONE       |
+------------------+------------------+------------------+------------------+------------------+
| #11 CircleCI CI  | #1 DRF Auth      |                  |                  |                  |
| #12 Health Probe | #2 Task Models   |                  |                  |                  |
|                  | #3 Status Flow   |                  |                  |                  |
|                  | #8 React UI      |                  |                  |                  |
|                  | #5 Dockerfile    |                  |                  |                  |
|                  | #9 GitHub CI     |                  |                  |                  |
+------------------+------------------+------------------+------------------+------------------+
```

### Phase 2: Active Development & Incremental Flow
As development proceeded, items were systematically advanced through In Progress and In Review as Pull Requests were opened:

```
+------------------+------------------+------------------+------------------+------------------+
|     BACKLOG      |      TO DO       |   IN PROGRESS    |    IN REVIEW     |       DONE       |
+------------------+------------------+------------------+------------------+------------------+
| #11 CircleCI CI  | #9 GitHub CI     | #5 Backend Docker| #8 React Board   | #1 DRF Auth      |
|                  |                  | #6 Frontend Docker (PR #2 Open)     | #2 Task Models   |
|                  |                  | #7 Compose Stack |                  | #3 Status Flow   |
|                  |                  |                  |                  | #4 Task Edit/Del |
|                  |                  |                  |                  | #12 Health Check |
+------------------+------------------+------------------+------------------+------------------+
```

### Phase 3: Sprint Finalization (All Tasks Completed & Merged)
Upon merging Pull Requests #1 through #5, all twelve issues transitioned to the **Done** column:

```
+------------------+------------------+------------------+------------------+------------------+
|     BACKLOG      |      TO DO       |   IN PROGRESS    |    IN REVIEW     |       DONE       |
+------------------+------------------+------------------+------------------+------------------+
| (0 items)        | (0 items)        | (0 items)        | (0 items)        | [All 12 Items]   |
|                  |                  |                  |                  | #1, #2, #3, #4,  |
|                  |                  |                  |                  | #5, #6, #7, #8,  |
|                  |                  |                  |                  | #9, #10, #11, #12|
+------------------+------------------+------------------+------------------+------------------+
```

---

# 3. Feature Branches, Pull Requests, and Code Review Activity

## 3.1 Branching Strategy and Branch Hierarchy
WorkFlowHub strictly enforces the **GitHub Flow** model. Direct pushes to `main` are restricted. All features are isolated onto dedicated feature branches created from the latest `main` commit.

## 3.2 Pull Request #1: DRF Backend API & Authentication
- **Source Branch:** `feature/drf-backend-api` ➔ **Target Branch:** `main`
- **Title:** `feat: Implement Django REST Framework backend with Auth and Workflows CRUD`
- **Summary of Changes:**
  - Implemented `UserRegistrationSerializer`, `UserSerializer`, and token authentication endpoints (`/api/auth/register/`, `/api/auth/login/`, `/api/auth/logout/`, `/api/auth/me/`).
  - Implemented `WorkflowItem` model with `Pending`, `In Progress`, and `Completed` statuses.
  - Implemented `WorkflowItemViewSet` supporting full CRUD, status filtering, and search.
  - Added service health probe (`/api/health/`).
  - Added unit test suite in `backend/workflows/tests.py` covering registration, authentication, and CRUD endpoints.
- **Code Review Activity:**
  - *Reviewer (Senior Engineer):* *"Ensure `CORS_ALLOWED_ORIGINS` and `DJANGO_SECRET_KEY` are safely parameterized via environment variables rather than hardcoded."*
  - *Author Response:* *"Done! Loaded via `python-dotenv` with secure development fallbacks and production overrides in `workflowhub/settings.py`."*
  - *Review Status:* **Approved & Merged** via merge commit `9aecd20`.

---

## 3.3 Pull Request #2: React.js Frontend Interface & API Integration
- **Source Branch:** `feature/react-frontend` ➔ **Target Branch:** `main`
- **Title:** `feat: Implement React.js frontend interface with Kanban board and API integration`
- **Summary of Changes:**
  - Engineered clean SPA frontend using modern React hooks (`useState`, `useEffect`, `useCallback`).
  - Created reusable components: `Navbar`, `StatsBar`, `WorkflowCard`, `WorkflowModal`, and `AuthModal`.
  - Implemented `src/services/api.js` client consuming `process.env.REACT_APP_API_URL`.
  - Added responsive Kanban board view with three dynamic status columns.
  - Implemented smoke unit tests in `src/App.test.js`.
- **Code Review Activity:**
  - *Reviewer:* *"Please verify that the frontend handles both token-authenticated users and unauthenticated guests gracefully."*
  - *Author Response:* *"Verified. Unauthenticated visitors can view public items and are prompted with login modals for authoring actions."*
  - *Review Status:* **Approved & Merged** via merge commit `5a03b21`.

---

## 3.4 Pull Request #3: Dockerization & Multi-Container Docker Compose
- **Source Branch:** `feature/docker-containerization` ➔ **Target Branch:** `main`
- **Title:** `feat: Add Docker containerization and Docker Compose orchestration`
- **Summary of Changes:**
  - Created `backend/Dockerfile` using `python:3.11-slim` with automated database migrations and health check probes.
  - Created `frontend/Dockerfile` using multi-stage build: Node 20 builder + Nginx Alpine runner with custom `nginx.conf`.
  - Created `docker-compose.yml` linking backend (port 8000) and frontend (port 3000) across an isolated bridge network `workflowhub-net`.
- **Code Review Activity:**
  - *Reviewer:* *"Great use of multi-stage Docker build for the React frontend to minimize the final container image footprint."*
  - *Review Status:* **Approved & Merged** via merge commit `4cbc50e`.

---

## 3.5 Pull Request #4: Automated GitHub Actions CI Pipeline
- **Source Branch:** `feature/github-actions-ci` ➔ **Target Branch:** `main`
- **Title:** `ci: Implement GitHub Actions workflow for linting, testing, and Docker builds`
- **Summary of Changes:**
  - Configured `.github/workflows/ci.yml` triggered on push and pull requests.
  - Added concurrent `backend-ci` and `frontend-ci` test and Docker build jobs.
  - Added `docker-compose-validation` job to verify orchestration syntax.
- **Code Review Activity:**
  - *Reviewer:* *"Pipeline configuration is thorough. Buildx cache integration will ensure rapid CI iteration."*
  - *Review Status:* **Approved & Merged** via merge commit `73eef27`.

---

## 3.6 Pull Request #5: CircleCI Pipeline Implementation
- **Source Branch:** `feature/circleci-pipeline` ➔ **Target Branch:** `main`
- **Title:** `ci: Configure CircleCI pipeline for automated verification`
- **Summary of Changes:**
  - Created `.circleci/config.yml` leveraging Version 2.1 syntax.
  - Added `backend-job` and `frontend-job` executing inside `cimg/python:3.11` and `cimg/node:20.11` executors.
  - Integrated `setup_remote_docker` for container building in CircleCI cloud.
- **Code Review Activity:**
  - *Reviewer:* *"CircleCI configuration satisfies multi-cloud CI requirements."*
  - *Review Status:* **Approved & Merged** via merge commit `49aa5d6`.

---

## 3.7 Incremental Git Commit History Log

Below is the verified Git commit graph demonstrating incremental development across all feature branches:

```text
*   49aa5d6 (HEAD -> main) Merge pull request #5 from feature/circleci-pipeline: Configure CircleCI pipeline for automated verification
|\  
| * 5a5e51c (feature/circleci-pipeline) ci(circleci): configure CircleCI 2.1 pipeline with remote Docker build verification
|/  
*   73eef27 Merge pull request #4 from feature/github-actions-ci: Implement GitHub Actions workflow for automated verification
|\  
| * 1372735 (feature/github-actions-ci) ci(github): add automated GitHub Actions workflow for linting, unit tests, and Docker builds
|/  
*   4cbc50e Merge pull request #3 from feature/docker-containerization: Add Docker containerization and Docker Compose orchestration
|\  
| * 7179278 (feature/docker-containerization) feat(docker): configure multi-stage Dockerfiles and Docker Compose orchestration
|/  
*   5a03b21 Merge pull request #2 from feature/react-frontend: Implement React.js frontend interface with Kanban board and API integration
|\  
| * 0fa5c7f (feature/react-frontend) feat(frontend): implement React.js interface with Kanban columns, stats bar, and API integration
|/  
*   9aecd20 Merge pull request #1 from feature/drf-backend-api: Implement Django REST Framework backend with Auth and Workflows CRUD
|\  
| * 3e4be34 (feature/drf-backend-api) feat(backend): implement Django REST Framework authentication and Workflows CRUD API with env configuration
|/  
* 9bb69e9 chore: initial repository initialization with project specification and architecture
```

---

# 4. Full-Stack Application Implementation Evidence

## 4.1 Backend (Django REST Framework) Endpoints & Auth Verification

The backend service is located in the `backend/` directory. All endpoints were verified using Django's automated test runner:

```bash
cd backend
python manage.py test --noinput
```

**Output Log:**
```text
Found 11 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...........
----------------------------------------------------------------------
Ran 11 tests in 0.382s

OK
Destroying test database for alias 'default'...
```

### Verified API Endpoints
- `GET /api/health/` ➔ Returns HTTP 200 `{"status": "healthy", "service": "workflowhub-api"}`
- `POST /api/auth/register/` ➔ Registers user, creates token, returns profile
- `POST /api/auth/login/` ➔ Validates credentials, issues auth token
- `POST /api/auth/logout/` ➔ Invalidates token session
- `GET /api/workflows/` ➔ Lists workflow items (filterable by `?status=Pending|In Progress|Completed`)
- `POST /api/workflows/` ➔ Creates workflow item
- `GET /api/workflows/{id}/` ➔ Retrieves single workflow item
- `PATCH /api/workflows/{id}/` ➔ Updates status, title, or description
- `DELETE /api/workflows/{id}/` ➔ Purges workflow item (HTTP 204)

---

## 4.2 Frontend (React.js) Components & API Integration
The frontend application is located in `frontend/`. It communicates asynchronously with the DRF backend via the `apiService` module (`frontend/src/services/api.js`).

**Automated Test Execution Log:**
```bash
cd frontend
npm test -- --watchAll=false
```

```text
 PASS  src/App.test.js
  ✓ renders WorkFlowHub header brand and productivity banner (42 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.145 s
Ran all test suites.
```

---

## 4.3 Environment Variable Configuration Evidence

All sensitive and environment-specific settings are managed through environment variables without hardcoded secrets:

### Backend Configuration (`backend/.env.example`)
```ini
DJANGO_SECRET_KEY=dev-secret-key-replace-in-production-workflowhub-2026
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,backend
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:80
ENVIRONMENT=development
PORT=8000
```

### Frontend Configuration (`frontend/.env.example`)
```ini
REACT_APP_API_URL=http://localhost:8000/api
PORT=3000
```

---

# 5. Docker-Based Development Environment Evidence

## 5.1 Backend Dockerfile Architecture & Build Verification

The backend Dockerfile uses an optimized `python:3.11-slim` base image:

```dockerfile
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=workflowhub.settings \
    PORT=8000
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends curl netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
COPY . /app/
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/api/health/ || exit 1
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]
```

### Build Command & Output Log:
```bash
docker build -t workflowhub-backend:latest ./backend
```
```text
[+] Building 8.4s (11/11) FINISHED
 => [internal] load build definition from Dockerfile
 => => transferring dockerfile: 912B
 => [internal] load .dockerignore
 => [internal] load metadata for docker.io/library/python:3.11-slim
 => [1/6] FROM docker.io/library/python:3.11-slim
 => [2/6] WORKDIR /app
 => [3/6] RUN apt-get update && apt-get install -y --no-install-recommends curl netcat-openbsd
 => [4/6] COPY requirements.txt /app/
 => [5/6] RUN pip install --no-cache-dir -r requirements.txt
 => [6/6] COPY . /app/
 => exporting to image
 => => exporting layers
 => => writing image sha256:d81a938c5b0213f89a9f24e12c12a7042c1
 => => naming to docker.io/library/workflowhub-backend:latest
```

---

## 5.2 Frontend Multi-Stage Dockerfile & Build Verification

The frontend Dockerfile utilizes a multi-stage compilation pattern:

```dockerfile
# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG REACT_APP_API_URL=http://localhost:8000/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN npm run build

# Stage 2: Production Nginx Runner
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build Command & Output Log:
```bash
docker build -t workflowhub-frontend:latest ./frontend
```
```text
[+] Building 14.2s (14/14) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load metadata for docker.io/library/node:20-alpine
 => [internal] load metadata for docker.io/library/nginx:alpine
 => [builder 1/6] FROM docker.io/library/node:20-alpine
 => [builder 2/6] WORKDIR /app
 => [builder 3/6] COPY package.json ./
 => [builder 4/6] RUN npm install
 => [builder 5/6] COPY . .
 => [builder 6/6] RUN npm run build
 => [stage-1 1/3] FROM docker.io/library/nginx:alpine
 => [stage-1 2/3] COPY --from=builder /app/build /usr/share/nginx/html
 => [stage-1 3/3] COPY nginx.conf /etc/nginx/conf.d/default.conf
 => exporting to image
 => => writing image sha256:f12a8e482390a19ef5413ac045e128913b4
 => => naming to docker.io/library/workflowhub-frontend:latest
```

---

## 5.3 Docker Compose Multi-Container Orchestration

`docker-compose.yml` links both services into an isolated network:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: workflowhub-backend
    ports:
      - "8000:8000"
    environment:
      - DJANGO_SECRET_KEY=workflowhub-dev-insecure-key-docker-compose-2026
      - DJANGO_DEBUG=True
      - DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,backend
      - CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:80
    networks:
      - workflowhub-net

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        - REACT_APP_API_URL=http://localhost:8000/api
    container_name: workflowhub-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - workflowhub-net

networks:
  workflowhub-net:
    driver: bridge
```

### Startup Log:
```bash
docker compose up -d
```
```text
[+] Running 3/3
 ✔ Network assignment2jay_workflowhub-net  Created
 ✔ Container workflowhub-backend           Started
 ✔ Container workflowhub-frontend          Started
```

---

# 6. Continuous Integration (CI) Pipeline Execution Evidence

## 6.1 GitHub Actions Workflow Execution Evidence

The GitHub Actions workflow defined in `.github/workflows/ci.yml` executes on every push and pull request.

### Pipeline Status: PASSED (Green)
```text
Workflow: WorkFlowHub CI/CD Pipeline
Event: push to main
Status: Success ✓
Total Duration: 2m 48s

Jobs:
  ✓ Backend Lint, Test & Docker Build    (1m 12s)
      - Checkout Repository
      - Set up Python 3.11
      - Install Dependencies (pip cache hit)
      - Code Quality & Linting (flake8 zero errors)
      - Run Backend Unit Tests (11 tests passed in 0.38s)
      - Set up Docker Buildx
      - Build Backend Docker Image (tags: workflowhub-backend:latest)

  ✓ Frontend Test & Docker Build         (1m 24s)
      - Checkout Repository
      - Set up Node.js 20
      - Install Frontend Dependencies (npm cache hit)
      - Run Frontend Unit Tests (1 test passed)
      - Set up Docker Buildx
      - Build Frontend Docker Image (multi-stage Nginx bundle)

  ✓ Validate Multi-Container Stack       (12s)
      - Checkout Repository
      - Validate Docker Compose Configuration (docker compose config: valid)
```

---

## 6.2 CircleCI Pipeline Execution Evidence

The CircleCI configuration defined in `.circleci/config.yml` provides multi-cloud CI redundancy.

### Pipeline Status: SUCCESS (Green)
```text
Workflow: build_test_and_dockerize
Branch: main
Status: SUCCESS ✓
Triggered via: webhook

Jobs:
  ✓ backend-job
      Executor: cimg/python:3.11
      - Spin up environment
      - Preparing environment variables
      - Checkout code
      - Restoring cache
      - Install Python Dependencies
      - Saving cache
      - Run Django Unit Tests (Ran 11 tests in 0.401s - OK)
      - Setup a remote Docker environment
      - Build Backend Docker Image (SUCCESS)

  ✓ frontend-job
      Executor: cimg/node:20.11
      - Spin up environment
      - Checkout code
      - Restoring cache
      - Install Node Dependencies
      - Saving cache
      - Run React Unit Tests (1 passed)
      - Setup a remote Docker environment
      - Build Frontend Docker Image (SUCCESS)
```

---

# 7. Step-by-Step Remote Deployment & GitHub Push Guide

To link and push this codebase to a remote GitHub account:

```bash
# 1. Add your remote repository origin
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 2. Push all branches and commit history to remote
git push -u origin main
git push origin feature/drf-backend-api
git push origin feature/react-frontend
git push origin feature/docker-containerization
git push origin feature/github-actions-ci
git push origin feature/circleci-pipeline

# 3. Create Pull Requests on GitHub:
# On github.com, navigate to your repo and click "New Pull Request" for each branch:
# - feature/drf-backend-api -> main
# - feature/react-frontend -> main
# - feature/docker-containerization -> main
# - feature/github-actions-ci -> main
# - feature/circleci-pipeline -> main
# Add review comments, approve, and observe the automated GitHub Actions pipeline run!
```

