# WorkFlowHub Ltd. — Full-Stack Workflow & Productivity Platform

[![CI/CD Pipeline](https://github.com/workflowhub/workflowhub/actions/workflows/ci.yml/badge.svg)](https://github.com/workflowhub/workflowhub/actions)
[![CircleCI](https://circleci.com/gh/workflowhub/workflowhub.svg?style=shield)](https://circleci.com/gh/workflowhub/workflowhub)

> **Course**: SOFT806 Continuous Integration and Continuous Deployment  
> **Institution**: Auckland Institute of Studies (AIS), New Zealand  
> **Trimester**: Trimester 3, 2026  
> **Assignment**: Assignment 1 (Individual) — Full-Stack CI/CD Pipeline Implementation

---

## 1. Project Overview

**WorkFlowHub Ltd.** is an emerging SaaS company building a lightweight workflow and productivity platform tailored for remote teams and independent professionals. The platform streamlines daily operational work routines, tracks sprint progress across stages, and enables seamless collaboration via an intuitive web interface.

### Key Capabilities
- **User Authentication**: Secure user registration, credential authentication, session tokens, and logout.
- **Task & Workflow Lifecycle Management**:
  - Create workflow items with titles and descriptive requirements.
  - Lifecycle state tracking: `Pending` ➔ `In Progress` ➔ `Completed`.
  - Edit existing titles and descriptions.
  - Delete completed or outdated items.
- **RESTful API**: Clean REST architecture built with Django REST Framework (DRF).
- **Modern Responsive Frontend**: Built with React.js using modern hooks and component patterns.
- **Containerized Architecture**: Production-ready Dockerfiles for both backend and frontend, orchestrated with Docker Compose.
- **Automated CI/CD**: Dual pipeline implementation with **GitHub Actions** and **CircleCI**.

---

## 2. Technology Stack & Architectural Decision

| Component | Technology | Rationale & Package Management |
| :--- | :--- | :--- |
| **Backend API** | Python 3.11 / Django 5.x / DRF | High-velocity development, robust ORM, built-in security, token authentication. Managed via `pip` and `requirements.txt`. |
| **Frontend UI** | React.js 18.x | Modular single-page application (SPA), rapid UI state updates, flexible styling. Managed via `npm` and `package.json`. |
| **Containerization** | Docker & Docker Compose | Consistent multi-container environments eliminating "works on my machine" issues. Multi-stage builds for minimal image size. |
| **CI/CD Primary** | GitHub Actions | Native repo co-location, zero external runner setup, matrix testing, automated Docker image build and validation. |
| **CI/CD Secondary** | CircleCI | Fast caching, Docker executor, verification across alternative cloud CI platform. |

---

## 3. Directory Layout

```
├── .circleci/
│   └── config.yml                  # CircleCI 2.1 pipeline configuration
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI workflow (lint, test, docker build)
├── backend/
│   ├── workflowhub/                # Django project settings and root URLs
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py             # Configured via environment variables
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── workflows/                  # Core application logic
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py               # WorkflowItem model
│   │   ├── serializers.py          # DRF Serializers (Auth + Workflows)
│   │   ├── tests.py                # Automated backend test suite
│   │   ├── urls.py                 # API router endpoints
│   │   └── views.py                # ViewSets and APIViews
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile                  # Python 3.11-slim container spec
│   ├── manage.py
│   └── requirements.txt            # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── AuthModal.js
│   │   │   ├── Navbar.js
│   │   │   ├── StatsBar.js
│   │   │   ├── WorkflowCard.js
│   │   │   └── WorkflowModal.js
│   │   ├── services/
│   │   │   └── api.js              # Fetch client reading REACT_APP_API_URL
│   │   ├── App.css
│   │   ├── App.js                  # Main dashboard layout
│   │   ├── App.test.js             # Frontend unit test
│   │   ├── index.css
│   │   └── index.js
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile                  # Multi-stage Node builder + Nginx runner
│   ├── nginx.conf                  # Nginx web server config with SPA routing
│   └── package.json                # Frontend dependencies
├── docker-compose.yml              # Local multi-container orchestration
├── .gitignore
└── README.md
```

---

## 4. API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health/` | Service health probe for CI and container healthchecks | No |
| `POST` | `/api/auth/register/` | Register new user account; returns user profile and token | No |
| `POST` | `/api/auth/login/` | Authenticate with credentials; returns token | No |
| `POST` | `/api/auth/logout/` | Invalidate current user auth token | Optional |
| `GET` | `/api/auth/me/` | Inspect current authenticated user | Optional |
| `GET` | `/api/workflows/` | List all workflow items (supports `?status=` and `?search=`) | No |
| `POST` | `/api/workflows/` | Create a new workflow item | Optional |
| `GET` | `/api/workflows/{id}/` | Retrieve a single workflow item by ID | No |
| `PATCH` | `/api/workflows/{id}/` | Update status, title, or description of a workflow item | No |
| `DELETE` | `/api/workflows/{id}/` | Remove a workflow item | No |

---

## 5. Local Setup & Execution

### Option A: Running with Docker Compose (Recommended)

Make sure Docker and Docker Compose are installed and running:

```bash
# Build and spin up both backend and frontend containers
docker compose up --build -d

# Check running services
docker compose ps

# View live container logs
docker compose logs -f
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:8000/api/](http://localhost:8000/api/)
- **API Health Probe**: [http://localhost:8000/api/health/](http://localhost:8000/api/health/)

To shut down containers:
```bash
docker compose down
```

---

### Option B: Running Bare Metal (Manual Development Mode)

#### 1. Backend (Django REST Framework)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py test     # Run test suite
python manage.py runserver 0.0.0.0:8000
```

#### 2. Frontend (React.js)
```bash
cd frontend
npm install
npm test -- --watchAll=false  # Run tests
npm start                     # Opens http://localhost:3000
```

---

## 6. Continuous Integration (CI/CD) Pipelines

### GitHub Actions (`.github/workflows/ci.yml`)
- **Triggers**: Executed on every `push` and `pull_request` targeting `main` and `feature/**`.
- **Backend CI Job**:
  1. Installs Python 3.11 with pip caching.
  2. Runs `flake8` syntax and complexity checks.
  3. Executes automated Django unit tests (`python manage.py test`).
  4. Builds the backend Docker image using Docker Buildx.
- **Frontend CI Job**:
  1. Installs Node.js 20 with npm caching.
  2. Runs frontend unit tests (`npm test`).
  3. Builds the frontend production Docker image with multi-stage Nginx packaging.
- **Docker Compose Validation Job**:
  1. Validates `docker compose config` to guarantee zero configuration regressions.

### CircleCI (`.circleci/config.yml`)
- Executes parallel containerized workflows across `cimg/python:3.11` and `cimg/node:20.11` executors.
- Leverages `setup_remote_docker` to verify Docker container building in cloud environments.

---

## 7. License & Academic Integrity
Developed as part of **SOFT806 Continuous Integration and Continuous Deployment**, Auckland Institute of Studies (AIS). All sources are cited according to APA 7th Edition guidelines.
