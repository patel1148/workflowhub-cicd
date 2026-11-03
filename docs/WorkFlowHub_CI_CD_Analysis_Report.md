---
title: "WorkFlowHub Ltd. — Continuous Integration and Deployment Strategy & Evaluation"
subtitle: "SOFT806 Continuous Integration and Continuous Deployment — Trimester 3, 2026"
author: "Student Name: Prashant Bastola (or Jay) | Student ID: AIS-SOFT806-2026"
date: "November 2026"
---

# Auckland Institute of Studies (AIS)
### Faculty of Information Technology Programme
**Course Code:** SOFT806  
**Course Title:** Continuous Integration and Continuous Deployment  
**Trimester:** Trimester 3, 2026  
**Assessment:** Assignment 1 (Individual)  
**Weighting:** 50% of Total Course Marks  
**Due Date:** Friday 6th November 2026, 4:00 PM  

\newpage

# Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Scenario Overview & Project Requirements](#2-scenario-overview--project-requirements)
  - [2.1 Business Context: WorkFlowHub Ltd.](#21-business-context-workflowhub-ltd)
  - [2.2 Functional and Non-Functional Requirements](#22-functional-and-non-functional-requirements)
  - [2.3 Architectural Decomposition](#23-architectural-decomposition)
- [3. Comparative Analysis of Continuous Integration Tools](#3-comparative-analysis-of-continuous-integration-tools)
  - [3.1 Compatibility with Project Requirements](#31-compatibility-with-project-requirements)
  - [3.2 Ease of Integration with GitHub Repositories](#32-ease-of-integration-with-github-repositories)
  - [3.3 Pipeline Configuration and Usability](#33-pipeline-configuration-and-usability)
  - [3.4 Support for Containerized Workflows (Docker Build and Execution)](#34-support-for-containerized-workflows-docker-build-and-execution)
  - [3.5 Availability of Docker Runners, Executors, and Container-Based Agents](#35-availability-of-docker-runners-executors-and-container-based-agents)
  - [3.6 Scalability and Performance](#36-scalability-and-performance)
  - [3.7 Security and Secrets Management](#37-security-and-secrets-management)
  - [3.8 Cost, Licensing, and Free Tier Allowances](#38-cost-licensing-and-free-tier-allowances)
  - [3.9 Flexibility and Customization of Pipelines](#39-flexibility-and-customization-of-pipelines)
  - [3.10 Monitoring, Logging, and Observability](#310-monitoring-logging-and-observability)
  - [3.11 Community Support, Ecosystem, and Documentation](#311-community-support-ecosystem-and-documentation)
  - [3.12 Comprehensive Tool Comparison Matrix](#312-comprehensive-tool-comparison-matrix)
- [4. Tool Selection and Critical Justification for WorkFlowHub Ltd.](#4-tool-selection-and-critical-justification-for-workflowhub-ltd)
  - [4.1 Primary Selection Decision](#41-primary-selection-decision)
  - [4.2 Justification Based on Project Requirements](#42-justification-based-on-project-requirements)
  - [4.3 Justification Based on Development Workflow and Collaboration](#43-justification-based-on-development-workflow-and-collaboration)
  - [4.4 Justification Based on Docker and Containerization Lifecycle](#44-justification-based-on-docker-and-containerization-lifecycle)
  - [4.5 Critical Evaluation of Trade-Offs](#45-critical-evaluation-of-trade-offs)
- [5. Prioritised Product Backlog for WorkFlowHub](#5-prioritised-product-backlog-for-workflowhub)
  - [5.1 Backlog Methodology & Prioritization Strategy](#51-backlog-methodology--prioritization-strategy)
  - [5.2 Application Development User Stories](#52-application-development-user-stories)
  - [5.3 DevOps and CI/CD Infrastructure User Stories](#53-devops-and-cicd-infrastructure-user-stories)
  - [5.4 Prioritized Backlog Summary Table](#54-prioritized-backlog-summary-table)
- [6. Development Workflow and Branching Strategy](#6-development-workflow-and-branching-strategy)
- [7. References (APA 7th Edition)](#7-references-apa-7th-edition)

\newpage

# 1. Executive Summary

Continuous Integration and Continuous Deployment (CI/CD) constitute the foundational backbone of modern software engineering, bridging agile development methodologies with reliable, automated operations (Humble & Farley, 2010). This report delivers an exhaustive technical evaluation, architectural analysis, and tool selection strategy tailored specifically for **WorkFlowHub Ltd.**, an emerging Software-as-a-Service (SaaS) provider developing a lightweight productivity and workflow management system for remote engineering teams and independent professionals.

WorkFlowHub Ltd. employs a decoupled full-stack architecture comprising a **Django REST Framework (DRF)** backend API and a **React.js** single-page application (SPA) frontend, encapsulated within containerized development and runtime environments powered by **Docker** and **Docker Compose**. 

To establish automated delivery and safeguard code quality, this report critically examines two premier CI/CD platforms: **GitHub Actions** and **CircleCI**. Through a structured eleven-dimensional evaluation encompassing architectural compatibility, container execution models, secrets management, scalability, and financial economics, GitHub Actions is selected as the optimal primary CI/CD platform. GitHub Actions demonstrates unmatched repository co-location, native Docker Buildx support, superior developer usability, and zero external integration overhead. Furthermore, a comprehensive, prioritized product backlog combining both functional user features and DevOps infrastructure stories is articulated using industry-standard agile conventions.

---

# 2. Scenario Overview & Project Requirements

## 2.1 Business Context: WorkFlowHub Ltd.
WorkFlowHub Ltd. is an emerging SaaS enterprise positioned in the highly competitive digital productivity market. As remote and hybrid work patterns have proliferated across knowledge industries, teams experience friction in coordinating decentralized tasks, visualizing operational workflows, and tracking sprint deliverables. WorkFlowHub addresses this market demand by delivering an intuitive, low-latency web application designed to minimize cognitive clutter while maximizing operational transparency.

The platform targets two key user personas:
1. **Remote Knowledge Workers & Developers:** Requiring rapid task creation, seamless status transitions across lifecycle phases, and immediate updates without administrative overhead.
2. **Technical Team Leads & Scrum Masters:** Requiring visibility into workflow throughput, stage bottlenecks, and reliable software availability backed by robust continuous deployment pipelines.

## 2.2 Functional and Non-Functional Requirements

### Functional Requirements
- **FR-01: User Authentication & Identity Management:** Users must be capable of registering an account with email and password, logging in securely, maintaining authenticated sessions via secure tokens, and logging out cleanly.
- **FR-02: Workflow Item Creation:** Authenticated users must be able to instantiate new workflow tasks consisting of a mandatory title and an optional rich description.
- **FR-03: Lifecycle Status Progression:** Users must be able to advance and modify workflow task states through a structured lifecycle: `Pending` ➔ `In Progress` ➔ `Completed`.
- **FR-04: Workflow Item Mutation & Maintenance:** Users must be able to edit task descriptions and titles to reflect evolving project parameters.
- **FR-05: Workflow Item Deletion:** Users must be able to permanently remove redundant or completed tasks to maintain clean operational workspaces.
- **FR-06: Task Querying & Filtering:** Users must have the ability to filter tasks by lifecycle state and search tasks by textual keywords.

### Non-Functional Requirements
- **NFR-01: Container Portability:** The backend and frontend services must be independently containerized using Docker, ensuring environmental parity between local developer workstations, CI build agents, and staging/production clouds (Docker Inc., 2024).
- **NFR-02: Environmental Variable Decoupling:** All sensitive configuration parameters (e.g., cryptographic keys, database URLs, API base endpoints, debug flags) must be injected through environment variables, strictly complying with the Twelve-Factor App methodology (Wiggins, 2017).
- **NFR-03: Automated Pipeline Execution:** Code pushed to feature branches or pull requests must trigger automated unit testing, linting, and Docker container builds within 5 minutes of invocation.
- **NFR-04: High Availability & Security:** API access must enforce secure token authentication and Cross-Origin Resource Sharing (CORS) policies.

## 2.3 Architectural Decomposition

The system architecture is engineered using a decoupled, service-oriented design:

```
+-----------------------------------------------------------------------+
|                           CLIENT BROWSER                              |
|   +---------------------------------------------------------------+   |
|   |         React.js Single Page Application (Port 3000)          |   |
|   |   - Responsive UI, Kanban Columns, Auth Forms, Dashboard     |   |
|   +-------------------------------+-------------------------------+   |
+-----------------------------------|-----------------------------------+
                                    | HTTP / REST (JSON)
                                    v
+-----------------------------------------------------------------------+
|                    DOCKER CONTAINER NETWORK                           |
|   +---------------------------------------------------------------+   |
|   |         Django REST Framework Backend API (Port 8000)         |   |
|   |   - TokenAuthentication, SessionMiddleware, CORS Middleware   |   |
|   |   - /api/auth/register/, /api/auth/login/, /api/auth/logout/  |   |
|   |   - /api/workflows/ (CRUD ViewSets), /api/health/             |   |
|   +-------------------------------+-------------------------------+   |
|                                   | ORM
|                                   v
|   +---------------------------------------------------------------+   |
|   |              Persistent Storage / Database Engine             |   |
|   |   - SQLite (Local Dev / CI) / PostgreSQL (Production)         |   |
|   +---------------------------------------------------------------+   |
+-----------------------------------------------------------------------+
```

---

# 3. Comparative Analysis of Continuous Integration Tools

To establish a resilient CI/CD pipeline, two leading industry platforms—**GitHub Actions** and **CircleCI**—were subjected to an exhaustive comparative investigation across eleven critical dimensions.

## 3.1 Compatibility with Project Requirements
- **GitHub Actions:** GitHub Actions provides out-of-the-box compatibility with the WorkFlowHub technology stack. Python 3.11 and Node.js 20 runtimes are natively pre-installed on GitHub-hosted virtual environments (`ubuntu-latest`). Consequently, testing DRF endpoints and compiling React bundles requires negligible bootstrap overhead. Furthermore, Docker and Docker Compose are embedded directly within the runner OS, permitting immediate invocation of `docker build` and multi-container validation without external daemon configuration (GitHub Inc., 2024).
- **CircleCI:** CircleCI is equally capable of supporting Django and React environments through its curated convenience images (`cimg/python:3.11` and `cimg/node:20.11`). However, because CircleCI separates its primary job executor from Docker engine execution, containerized builds require invoking the `setup_remote_docker` step, introducing architectural abstraction and slight initialization latency (CircleCI, 2024).

## 3.2 Ease of Integration with GitHub Repositories
- **GitHub Actions:** As an intrinsic component of the GitHub platform, GitHub Actions requires zero external account provisioning, webhook registration, or OAuth token exchanges. Workflows reside directly within the repository filesystem at `.github/workflows/*.yml`. Pipeline runs, pull request status checks, commit annotations, and automated review gates operate inside a single unified web console.
- **CircleCI:** CircleCI operates as an external Software-as-a-Service entity. Integrating CircleCI necessitates granting the CircleCI OAuth application read/write permissions to GitHub repositories, configuring repository webhooks, and synchronizing project permissions. While CircleCI's GitHub App provides a clean integration, managing separate user roles, billing dashboards, and organization settings across two platforms imposes an administrative tax on small engineering teams (Bass et al., 2015).

## 3.3 Pipeline Configuration and Usability
- **GitHub Actions:** GitHub Actions uses a clean YAML dialect organized hierarchically into `workflows`, `events` (`on`), `jobs`, and `steps`. Steps execute either shell commands or community-developed `actions` via the `uses` clause. GitHub Actions supports **Reusable Workflows** and **Composite Actions**, allowing teams to encapsulate boilerplate pipeline logic cleanly. Usability is elevated by syntax auto-completion in modern IDEs and workflow validation directly within the GitHub web editor.
- **CircleCI:** CircleCI utilizes a centralized `.circleci/config.yml` configuration standard based on Version 2.1 syntax. CircleCI structures pipelines around `executors`, `commands`, `jobs`, and `workflows`. A significant usability asset in CircleCI is **Orbs**—reusable, shareable packages of configuration logic that abstract complex commands (e.g., `circleci/python`, `circleci/docker`). However, the learning curve for CircleCI’s configuration is steeper due to advanced concepts like anchors, aliases, and complex parameter handling.

## 3.4 Support for Containerized Workflows (Docker Build and Execution)
- **GitHub Actions:** GitHub-hosted runners run directly as root inside Azure-backed virtual machines, granting full, unrestricted access to the local Docker daemon socket (`/var/run/docker.sock`). Developers can run Docker-in-Docker natively, build multi-stage Dockerfiles, mount host volumes, and leverage official actions such as `docker/setup-buildx-action` and `docker/build-push-action`. Build cache export to GitHub Actions cache storage (`type=gha`) is seamlessly supported, accelerating repeated container builds.
- **CircleCI:** In CircleCI's standard `docker` executor, the primary build container does not have direct access to a local Docker daemon. To build Docker images, developers must explicitly inject the `setup_remote_docker` directive. This provisions a separate, isolated virtual machine hosting a remote Docker daemon. While secure, this architecture prevents mounting local workspace directories directly into build containers without network copying, complicating local container testing patterns (CircleCI, 2024).

## 3.5 Availability of Docker Runners, Executors, and Container-Based Agents
- **GitHub Actions:** GitHub provides fully managed runners running Ubuntu (Linux), Windows Server, and macOS. The standard Linux runners provide 2 vCPUs, 7 GB of RAM, and 14 GB of SSD storage, which is more than sufficient for concurrent Django unit tests and React Webpack builds. Additionally, teams can self-host runners inside their own Kubernetes clusters or on-premise infrastructure using the open-source runner application with zero licensing penalties.
- **CircleCI:** CircleCI offers a broader range of executor abstractions: `docker` (container-based), `machine` (dedicated Linux/Windows VM), and `macos`. CircleCI also provides granular **Resource Classes** ranging from `small` (1 vCPU, 2 GB RAM) up to `2xlarge+` (20 vCPUs, 40 GB RAM). This allows teams to precisely size compute resources to heavy compilation workloads. Self-hosted runner agents are available via CircleCI Runner, though free tier limits apply.

## 3.6 Scalability and Performance
- **GitHub Actions:** GitHub Actions supports matrix build strategies, allowing developers to execute test suites across multiple Python versions (e.g., 3.10, 3.11, 3.12) and Node.js environments concurrently. GitHub provisions separate virtual machines for each job in parallel. Dependency caching (`actions/cache`) supports global caching up to 10 GB per repository, with eviction based on least-recently-used heuristics.
- **CircleCI:** CircleCI has historically been recognized for exceptional build caching and concurrency optimization. It supports advanced features such as automatic test splitting across parallel containers based on historical timing data (`circleci tests split`). For large codebases with thousands of unit tests, CircleCI's test parallelism provides substantial build time reduction.

## 3.7 Security and Secrets Management
- **GitHub Actions:** Secrets are encrypted using Libsodium sealed boxes and managed at the repository, organization, or environment level. Access to environment-level secrets can be protected behind manual approval gates and branch restrictions (e.g., only `main` can access production credentials). GitHub Actions also provides native support for **OpenID Connect (OIDC)**, eliminating the need to store static cloud provider credentials (e.g., AWS, GCP) inside repository settings. Secrets are automatically redacted from execution logs.
- **CircleCI:** CircleCI provides **Contexts**—collections of environment variables secured and shared across multiple projects within an organization. Contexts can be restricted to specific user groups via integration with GitHub teams. While secure, managing secrets across an external vendor adds an additional surface area for access review and potential misconfiguration.

## 3.8 Cost, Licensing, and Free Tier Allowances
- **GitHub Actions:**
  - *Public Repositories:* 100% free, unlimited runner minutes, and up to 500 MB of package storage.
  - *Private Repositories:* 2,000 free runner minutes per month on the standard Free tier, resetting monthly. Paid minutes on Linux runners are billed at an economical \$0.008 per minute.
- **CircleCI:**
  - *Free Tier:* 6,000 build credits per month, translating approximately to 30 build minutes per week on a standard Linux medium executor (or ~250–300 minutes per month).
  - *Paid Plans:* Scale-up plans start at \$15/month for additional credits, with per-seat licensing models that rapidly escalate for growing teams.

## 3.9 Flexibility and Customization of Pipelines
- **GitHub Actions:** The **GitHub Marketplace** contains over 20,000 verified actions created by major technology vendors (Docker, AWS, Snyk, SonarSource) and open-source contributors. Developers can write custom actions in JavaScript or package any custom Docker container as an action. Workflows can be triggered by over 30 discrete GitHub webhook events, including `push`, `pull_request`, `issue_comment`, `release`, and `workflow_dispatch`.
- **CircleCI:** Customization centers on CircleCI Orbs and parameterized shell commands. While the Orb registry contains high-quality official integrations, the breadth of the community ecosystem is narrower than the GitHub Marketplace. Triggers are primarily restricted to Git VCS events, scheduled crons, and API webhooks.

## 3.10 Monitoring, Logging, and Observability
- **GitHub Actions:** Offers real-time log streaming with ANSI color rendering, live step-by-step collapse/expand, and deep links to specific lines of failure. Workflow run status badges are easily embedded into repository documentation. Test summary tables and job artifacts (e.g., coverage HTML reports, build logs) are stored directly with the commit.
- **CircleCI:** Features an analytics dashboard providing insights into build success rates, workflow duration trends, credit consumption metrics, and flaky test identification. The historical insights dashboard in CircleCI is superior for enterprise metrics reporting.

## 3.11 Community Support, Ecosystem, and Documentation
- **GitHub Actions:** Backed by Microsoft and GitHub, documentation is exhaustive, translated, and filled with real-world examples. Given that millions of open-source projects rely on GitHub Actions, developer troubleshooting via Stack Overflow, GitHub Discussions, and tech blogs is virtually instantaneous.
- **CircleCI:** Provides thorough, professional documentation and an active user forum (CircleCI Discuss). However, non-enterprise community discussions have partially migrated toward GitHub Actions over recent years as native tooling matured.

---

## 3.12 Comprehensive Tool Comparison Matrix

| Evaluation Dimension | GitHub Actions | CircleCI | Winner / Advantage |
| :--- | :--- | :--- | :--- |
| **1. Compatibility with Requirements** | Native Python, Node, and Docker on standard runners | Convenience images available; requires remote Docker setup | **GitHub Actions** |
| **2. GitHub Repository Integration** | Seamless native integration; zero configuration | Requires third-party OAuth, webhooks, and separate dashboard | **GitHub Actions** |
| **3. Configuration Usability** | Intuitive YAML; step-level actions; IDE autocompletion | Powerful YAML syntax with Orbs, but steeper learning curve | **GitHub Actions** |
| **4. Docker Support & Workflows** | Native `/var/run/docker.sock` access; Buildx caching | Remote Docker daemon (`setup_remote_docker`); volume limitations | **GitHub Actions** |
| **5. Runner & Agent Architecture** | 2 vCPU Linux VMs with generous limits; self-hosted options | Granular resource classes; small to 2xlarge+ options | **CircleCI** (Raw compute choices) |
| **6. Scalability & Performance** | Fast parallel matrix execution; 10 GB repo cache | Advanced automated test splitting; historical metrics | **CircleCI** (Enterprise test splitting) |
| **7. Security & Secrets Management** | Libsodium encrypted secrets; OIDC cloud auth; protected envs | Project & Context-level environment variables; RBAC | **GitHub Actions** (OIDC & native auth) |
| **8. Cost & Free Tier Allowances** | 2,000 free min/mo for private repos; unlimited for public | 6,000 credits/mo (~30 min/week); seat-based pricing | **GitHub Actions** |
| **9. Flexibility & Extensibility** | 20,000+ Marketplace actions; 30+ event triggers | Curated Orb registry; primarily VCS-triggered | **GitHub Actions** |
| **10. Monitoring & Observability** | Live step streaming; inline PR annotations; artifact storage | Excellent historical pipeline metrics and flaky test tracking | **CircleCI** (Long-term metrics) |
| **11. Community & Documentation** | Industry-dominant adoption; massive open-source community | High-quality vendor documentation; specialized user forum | **GitHub Actions** |

---

# 4. Tool Selection and Critical Justification for WorkFlowHub Ltd.

## 4.1 Primary Selection Decision
Based on the multi-dimensional comparative analysis, **GitHub Actions is conclusively selected as the primary CI/CD platform for WorkFlowHub Ltd.** 

While CircleCI remains a formidable enterprise pipeline engine, GitHub Actions offers structural, architectural, and financial superiorities that directly match the operational constraints of WorkFlowHub as an agile SaaS startup.

## 4.2 Justification Based on Project Requirements
WorkFlowHub’s technical stack requires continuous validation across two distinct runtime ecosystems: a Python 3.11 / Django REST Framework service and a Node.js 20 / React single-page application. 

GitHub Actions executes both testing suites in parallel within lightweight, isolated Ubuntu virtual environments without provisioning external container dependencies. In our implemented `.github/workflows/ci.yml` pipeline, the `backend-ci` and `frontend-ci` jobs run concurrently. The backend job executes Django migrations and unit tests (`python manage.py test`) in seconds, while the frontend job executes Jest tests (`npm test`). The native co-location of these test runs within the GitHub Pull Request interface ensures immediate feedback to software engineers before code is merged.

## 4.3 Justification Based on Development Workflow and Collaboration
For a lean team building WorkFlowHub, minimizing "context switching" between disparate developer portals is a paramount productivity imperative. 
1. **Single Pane of Glass:** With GitHub Actions, repository source code, issues, Kanban project boards, pull request reviews, pipeline logs, and deployment statuses reside in one unified web interface. 
2. **Branch Protection & Review Gates:** GitHub Actions binds seamlessly with GitHub branch protection policies. We can enforce that no feature branch can be merged into `main` unless:
   - The `backend-ci` job passes without error.
   - The `frontend-ci` job passes without error.
   - The `docker-compose-validation` job passes without error.
   - At least one peer review approval is submitted.
CircleCI cannot enforce these gates without external webhook callbacks and additional status-check synchronization.

## 4.4 Justification Based on Docker and Containerization Lifecycle
Docker containerization is the central deployment artifact for WorkFlowHub. The application relies on multi-stage Docker builds to produce compact, production-hardened container images:
- In GitHub Actions, runners provide root access to the host Docker daemon. The pipeline utilizes the official `docker/setup-buildx-action` and `docker/build-push-action` plugins, which directly leverage BuildKit. BuildKit accelerates image creation through layer concurrency, target stage compilation, and inline cache reuse.
- In CircleCI, building Docker images requires spinning up a secondary remote VM via `setup_remote_docker`. This architecture introduces network transfer latency when moving context directories between the primary container and the remote daemon, and it prohibits host volume mounting. GitHub Actions delivers a strictly superior local-to-CI parity experience.

## 4.5 Critical Evaluation of Trade-Offs
A rigorous architectural selection must acknowledge trade-offs:
- *Where CircleCI Excels:* CircleCI offers sophisticated automated test splitting across hundreds of nodes and provides a centralized organizational insights dashboard. 
- *Why the Trade-Off Favors GitHub Actions:* WorkFlowHub is an emerging SaaS product with a focused test suite running under three minutes. The overhead of configuring test splitting or managing CircleCI contexts introduces unnecessary accidental complexity (Brooks, 1987). Furthermore, GitHub Actions' generous allowance of 2,000 free private minutes per month eliminates early infrastructure hosting expenses, maximizing capital efficiency for WorkFlowHub Ltd.

---

# 5. Prioritised Product Backlog for WorkFlowHub

## 5.1 Backlog Methodology & Prioritization Strategy
The WorkFlowHub product backlog is structured according to Agile Scrum principles. Requirements are decomposed into self-contained **User Stories** following the standard industry template:
$$\text{As a } \langle \text{role} \rangle, \text{ I want } \langle \text{feature} \rangle \text{ so that } \langle \text{benefit} \rangle.$$

Each story is evaluated using the **MoSCoW Prioritization Framework** (Must Have, Should Have, Could Have, Won't Have) and assigned a sequential numerical priority ranking reflecting technical dependencies and customer value delivery. The backlog purposefully bridges **Application Development** and **DevOps / CI/CD Infrastructure**, ensuring operational reliability is treated as a first-class citizen alongside user features (Kim et al., 2016).

---

## 5.2 Application Development User Stories

### US-01: User Registration & Identity Provisioning
- **Priority:** Must Have (Rank 1) | **Story Points:** 5
- **User Story:** *As a new remote professional, I want to create a secure personal account with my username, email, and password so that I can access my private workflow dashboard.*
- **Acceptance Criteria:**
  - Given valid credentials, posting to `/api/auth/register/` creates a new `User` record with hashed password.
  - Returns a unique authentication token and user profile metadata (HTTP 201 Created).
  - Enforces password length of at least 6 characters and confirms password matching.
  - Rejects duplicate usernames with appropriate HTTP 400 validation errors.

### US-02: Workflow Item Creation & Data Model
- **Priority:** Must Have (Rank 2) | **Story Points:** 5
- **User Story:** *As an authenticated team member, I want to create a new workflow item with a title and detailed description so that I can record and track upcoming sprint tasks.*
- **Acceptance Criteria:**
  - POST to `/api/workflows/` with `title` and `description` persists a `WorkflowItem` record.
  - Defaults `status` to `Pending` and attaches the authenticated user as `owner`.
  - Rejects requests missing the mandatory `title` field (HTTP 400).
  - Automatically records `created_at` and `updated_at` UTC timestamps.

### US-03: Lifecycle Status Progression
- **Priority:** Must Have (Rank 3) | **Story Points:** 3
- **User Story:** *As a team member working on a task, I want to update its status from "Pending" to "In Progress" and finally to "Completed" so that my team has real-time visibility into operational progress.*
- **Acceptance Criteria:**
  - PATCH to `/api/workflows/{id}/` with `{"status": "In Progress"}` successfully transitions state.
  - Accepted status choices are strictly restricted to: `Pending`, `In Progress`, `Completed`.
  - Frontend cards provide one-click action buttons to advance or revert states.
  - Status transitions trigger an updated timestamp and render visual badge updates.

### US-04: Workflow Item Editing & Deletion
- **Priority:** Must Have (Rank 4) | **Story Points:** 3
- **User Story:** *As a user, I want to edit existing task details or delete completed and obsolete tasks so that my board remains accurate and uncluttered.*
- **Acceptance Criteria:**
  - PATCH to `/api/workflows/{id}/` permits modifying `title` and `description`.
  - DELETE to `/api/workflows/{id}/` permanently purges the item from the database (HTTP 204 No Content).
  - Frontend prompts user confirmation before executing deletion.

### US-05: Interactive Kanban Board & Filtering Interface
- **Priority:** Should Have (Rank 5) | **Story Points:** 5
- **User Story:** *As a team member, I want an interactive visual board with columns for Pending, In Progress, and Completed tasks, plus keyword searching, so that I can manage my workload efficiently.*
- **Acceptance Criteria:**
  - UI organizes tasks into three distinct vertical columns based on status.
  - A real-time search input filters displayed cards by matching title strings.
  - Category filter pills allow toggling between `All`, `Pending`, `In Progress`, and `Completed`.
  - Displays summary metrics bar (Total, Pending count, In Progress count, Completed count, Completion Rate %).

---

## 5.3 DevOps and CI/CD Infrastructure User Stories

### US-06: Backend Dockerization & Environment Variable Isolation
- **Priority:** Must Have (Rank 6) | **Story Points:** 5
- **User Story:** *As a DevOps engineer, I want to package the Django REST Framework backend into an optimized Docker container configured via environment variables so that it can run identically in development and production.*
- **Acceptance Criteria:**
  - `backend/Dockerfile` utilizes an official `python:3.11-slim` base image.
  - Dependencies are installed via `pip install -r requirements.txt` without caching leftover wheels.
  - `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, and `CORS_ALLOWED_ORIGINS` are injected via environment variables.
  - Container exposes port 8000 and includes a `HEALTHCHECK` directive hitting `/api/health/`.

### US-07: Frontend Multi-Stage Docker Packaging
- **Priority:** Must Have (Rank 7) | **Story Points:** 5
- **User Story:** *As a DevOps engineer, I want to package the React frontend using a multi-stage Dockerfile with Nginx so that production assets are served efficiently with minimal image size.*
- **Acceptance Criteria:**
  - Stage 1 compiles React assets using `node:20-alpine` via `npm run build`.
  - Stage 2 serves compiled static artifacts using `nginx:alpine`.
  - Custom `nginx.conf` handles client-side SPA routing (`try_files $uri /index.html;`).
  - Container accepts `REACT_APP_API_URL` as a build argument and runtime environment variable.
  - Final image size remains below 50 MB.

### US-08: Multi-Container Local Orchestration via Docker Compose
- **Priority:** Must Have (Rank 8) | **Story Points:** 3
- **User Story:** *As a developer, I want to launch the complete full-stack environment using a single `docker compose up` command so that onboarding is instant and isolated.*
- **Acceptance Criteria:**
  - `docker-compose.yml` configures `backend` (port 8000) and `frontend` (port 3000) services.
  - Frontend service declares dependency on backend (`depends_on: [backend]`).
  - Both services communicate over an internal bridge network (`workflowhub-net`).
  - Database persistence is maintained via named volumes.

### US-09: Automated GitHub Actions CI Pipeline
- **Priority:** Must Have (Rank 9) | **Story Points:** 5
- **User Story:** *As a developer, I want automated quality checks and Docker image builds to trigger on every push and pull request so that regressions are caught before merging to main.*
- **Acceptance Criteria:**
  - `.github/workflows/ci.yml` triggers on `push` and `pull_request` to `main` and `feature/**`.
  - `backend-ci` job installs Python 3.11, runs `flake8` linter, executes `manage.py test`, and builds backend Docker image.
  - `frontend-ci` job installs Node 20, executes `npm test`, and builds frontend Docker image.
  - `docker-compose-validation` validates multi-container orchestration syntax.
  - Pipeline executes in under 4 minutes.

### US-10: Git Branching & Pull Request Review Workflow
- **Priority:** Should Have (Rank 10) | **Story Points:** 3
- **User Story:** *As a release manager, I want all modifications developed on isolated feature branches and merged via Pull Requests with mandatory review so that code quality and branch stability are enforced.*
- **Acceptance Criteria:**
  - Direct commits to `main` are restricted.
  - Developers open PRs from `feature/*` branches.
  - CI pipeline must report green status before PR can be approved.
  - Evidence of peer review comments and formal approvals documented on GitHub.

### US-11: Multi-Cloud Secondary CI Pipeline (CircleCI)
- **Priority:** Medium (Rank 11) | **Story Points:** 3
- **User Story:** *As an infrastructure architect, I want a functional CircleCI pipeline configuration so that the application demonstrates multi-cloud CI portability.*
- **Acceptance Criteria:**
  - `.circleci/config.yml` declares Version 2.1 configuration.
  - Executes parallel jobs for backend unit tests and frontend unit tests.
  - Utilizes `setup_remote_docker` to verify Docker container building in CircleCI cloud.
  - Generates successful green build status.

### US-12: API Health Check & Readiness Probes
- **Priority:** Low (Rank 12) | **Story Points:** 2
- **User Story:** *As a site reliability engineer, I want an unauthenticated health probe endpoint so that container orchestrators and monitoring agents can verify service availability.*
- **Acceptance Criteria:**
  - GET `/api/health/` returns HTTP 200 with JSON payload `{"status": "healthy", "service": "workflowhub-api"}`.
  - Integrates with Docker container health checks.

---

## 5.4 Prioritized Backlog Summary Table

| ID | Title / Feature | Category | Priority | Story Points | Target Milestone |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **US-01** | User Registration & Identity Provisioning | Application | Must Have (Rank 1) | 5 | Sprint 1: Foundation |
| **US-02** | Workflow Item Creation & Data Model | Application | Must Have (Rank 2) | 5 | Sprint 1: Foundation |
| **US-03** | Lifecycle Status Progression | Application | Must Have (Rank 3) | 3 | Sprint 1: Foundation |
| **US-04** | Workflow Item Editing & Deletion | Application | Must Have (Rank 4) | 3 | Sprint 1: Foundation |
| **US-06** | Backend Dockerization & Env Vars | DevOps | Must Have (Rank 5) | 5 | Sprint 1: Foundation |
| **US-07** | Frontend Multi-Stage Docker Packaging | DevOps | Must Have (Rank 6) | 5 | Sprint 2: UI & Container |
| **US-08** | Multi-Container Docker Compose Stack | DevOps | Must Have (Rank 7) | 3 | Sprint 2: UI & Container |
| **US-05** | Interactive Kanban Board & Filtering UI | Application | Should Have (Rank 8) | 5 | Sprint 2: UI & Container |
| **US-09** | Automated GitHub Actions CI Pipeline | DevOps | Must Have (Rank 9) | 5 | Sprint 3: Automation |
| **US-10** | Branching Strategy & PR Code Review | DevOps | Should Have (Rank 10) | 3 | Sprint 3: Automation |
| **US-11** | Secondary CircleCI Pipeline Verification | DevOps | Could Have (Rank 11) | 3 | Sprint 3: Automation |
| **US-12** | API Health & Readiness Probes | DevOps | Could Have (Rank 12) | 2 | Sprint 3: Automation |

---

# 6. Development Workflow and Branching Strategy

To safeguard the stability of the production release line while fostering rapid iteration, WorkFlowHub implements a **GitHub Flow** branching model with formal peer review gates:

```
  main  ●───────●─────────────────────●──────────────●──────────────● (Production Ready)
         \     /                     /              /              /
          \   / Merge PR #1         / Merge PR #2  / Merge PR #3  / Merge PR #4
feature/backend ●───●              /              /              /
                                  /              /              /
feature/frontend-ui              ●─────●        /              /
                                               /              /
feature/docker-compose                        ●──────●        /
                                                             /
feature/ci-pipelines                                        ●──────●
```

1. **Main Branch:** Represents deployable, production-ready code. Direct pushes are disabled.
2. **Feature Branches (`feature/<descriptive-name>`):** Developers branch off the latest `main` commit.
3. **Continuous Verification:** Every commit pushed to a feature branch triggers GitHub Actions to run tests and Docker builds.
4. **Pull Requests & Code Review:** Merging into `main` requires a Pull Request, an automated green CI build badge, and a verified code review approval from a peer reviewer.

---

# 7. References (APA 7th Edition)

- Bass, L., Weber, I., & Zhu, L. (2015). *DevOps: A software architect's perspective*. Addison-Wesley Professional.
- Brooks, F. P. (1987). No silver bullet: Essence and accidents of software engineering. *IEEE Computer*, 20(4), 10–19. https://doi.org/10.1109/MC.1987.1663532
- CircleCI. (2024). *CircleCI documentation: Executors and running Docker commands*. CircleCI. https://circleci.com/docs/building-docker-images/
- Django Software Foundation. (2024). *Django REST framework: Web APIs for Django (Version 3.15)*. Django Software Foundation. https://www.django-rest-framework.org/
- Docker Inc. (2024). *Docker documentation: Best practices for writing Dockerfiles*. Docker Inc. https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- Fowler, M. (2006). *Continuous Integration*. MartinFowler.com. https://martinfowler.com/articles/continuousIntegration.html
- GitHub Inc. (2024). *GitHub Actions documentation: Workflow syntax and runners*. GitHub Inc. https://docs.github.com/en/actions
- Humble, J., & Farley, D. (2010). *Continuous Delivery: Reliable software releases through build, test, and deployment automation*. Addison-Wesley.
- Kim, G., Humble, J., Debois, P., & Willis, J. (2016). *The DevOps handbook: How to create world-class agility, reliability, and security in technology organizations*. IT Revolution Press.
- Meta Platforms Inc. (2024). *React documentation: The library for web and native user interfaces*. Meta Platforms Inc. https://react.dev/
- Nygard, M. T. (2018). *Release it! Design and deploy production-ready software* (2nd ed.). Pragmatic Bookshelf.
- Open Container Initiative. (2023). *OCI image format specification (Version 1.0)*. Linux Foundation. https://opencontainers.org/
- Python Software Foundation. (2024). *Python 3.11 documentation*. Python Software Foundation. https://docs.python.org/3.11/
- Wiggins, A. (2017). *The Twelve-Factor App*. Heroku. https://12factor.net/

