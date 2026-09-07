# Employee Management System

A full-stack **Employee Management System** developed with **Spring Boot, PostgreSQL, and a web frontend**, containerized using **Docker** and deployed on a **multi-node Kubernetes cluster**.

The project demonstrates practical DevOps skills including application containerization, Kubernetes deployment, service networking, CI/CD, persistent database integration, monitoring, and troubleshooting.

## Project Overview

The application provides REST APIs for managing employee records and supports complete CRUD operations:

- Create employees
- View all employees
- View employee details
- Update employee information
- Delete employees

The application is deployed using separate frontend, backend, and PostgreSQL components inside Kubernetes.

## Architecture

```text
                    User / Browser
                          |
                          |
                    Kubernetes NodePort
                          |
                          v
                  +----------------+
                  |    Frontend    |
                  |     NGINX      |
                  +----------------+
                          |
                       /api/*
                          |
                          v
                  +----------------+
                  | Spring Boot    |
                  |    Backend     |
                  +----------------+
                          |
                       JDBC
                          |
                          v
                  +----------------+
                  |   PostgreSQL   |
                  |   employee_db  |
                  +----------------+
```

## Technology Stack

| Category | Technologies |
|---|---|
| Backend | Java 17, Spring Boot |
| Database | PostgreSQL |
| Build Tool | Maven |
| Frontend Proxy | NGINX |
| Containerization | Docker |
| Orchestration | Kubernetes |
| CI/CD | Jenkins, GitHub |
| Monitoring | Prometheus, Grafana |
| Package Management | Helm |
| Operating System | Linux / Ubuntu |
| Version Control | Git, GitHub |

## Repository Structure

```text
employee-management-system/
├── backend/
├── frontend/
├── database/
├── docker/
├── k8s/
├── Jenkinsfile
├── .gitignore
└── README.md
```

## Backend REST API

The Spring Boot backend exposes REST endpoints under:

```text
/api/employees
```

Main operations include:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## Docker

Application components are containerized using Docker.

The backend application is built using Maven:

```bash
mvn clean package -DskipTests
```

The generated Spring Boot application is packaged into a Docker image and used by the Kubernetes deployment.

Docker images are stored in a container registry and pulled by Kubernetes during application deployment.

## Kubernetes Deployment

The application runs on a **multi-node Kubernetes cluster**.

The Kubernetes deployment includes:

- Frontend Deployment
- Backend Deployment
- PostgreSQL Deployment
- Kubernetes Services
- NodePort access
- ConfigMaps / application configuration
- Secrets for sensitive configuration

Example namespace:

```text
employee-management
```

The frontend uses NGINX to forward API requests to the backend Kubernetes service.

```text
Browser
   |
   v
Frontend NodePort
   |
   v
NGINX
   |
   | /api/*
   v
backend-service:8080
   |
   v
Spring Boot
   |
   v
PostgreSQL
```

This allows the frontend to communicate with the backend through Kubernetes internal service discovery rather than hard-coded pod IP addresses.

## PostgreSQL Integration

PostgreSQL is used as the persistent application database.

The backend connects to PostgreSQL through the Kubernetes PostgreSQL service.

Employee CRUD operations were validated end-to-end:

```text
Browser
   ↓
Frontend / NGINX
   ↓
Spring Boot REST API
   ↓
PostgreSQL
```

Database records were also verified directly using `psql`.

## CI/CD with Jenkins

The repository contains a `Jenkinsfile` for Pipeline as Code.

The CI workflow includes application build and Docker image creation.

```text
GitHub
   |
   v
Jenkins Pipeline
   |
   v
Maven Build
   |
   v
Docker Image Build
```

GitHub Webhooks can be used to trigger Jenkins builds when code changes are pushed to the repository.

## Monitoring with Prometheus and Grafana

Kubernetes monitoring is implemented using the **kube-prometheus-stack** deployed through Helm.

The monitoring stack includes:

- Prometheus
- Grafana
- Alertmanager
- Node Exporter
- kube-state-metrics
- Prometheus Operator

Prometheus collects Kubernetes and node metrics, while Grafana provides dashboards for visualizing cluster health and resource utilization.

Monitoring can be used to observe:

- CPU utilization
- Memory utilization
- Filesystem usage
- Kubernetes node health
- Pod status
- Container resource utilization
- Kubernetes workloads

## Troubleshooting Performed

Several real Kubernetes and Linux infrastructure issues were diagnosed and resolved during implementation.

### Kubernetes Networking

Diagnosed backend-to-database connectivity problems caused by node networking and routing configuration.

### Calico CNI

Troubleshot Calico networking issues that affected pod communication and Kubernetes networking.

### CORS

Configured Spring Boot CORS settings to allow frontend requests to reach the backend REST API correctly.

### DiskPressure and Pod Eviction

Diagnosed Kubernetes `DiskPressure` and pod eviction caused by insufficient node storage.

The VM disks were expanded and the Linux storage stack was resized using:

```bash
growpart
pvresize
lvextend
resize2fs
```

After storage expansion and kubelet recovery, Kubernetes nodes returned to healthy status.

### End-to-End Validation

Application connectivity was tested across the complete request path:

```text
Client
  ↓
Kubernetes NodePort
  ↓
Frontend NGINX
  ↓
Backend Service
  ↓
Spring Boot
  ↓
PostgreSQL
```

CRUD operations were verified successfully against PostgreSQL.

## Monitoring Architecture

```text
Kubernetes Cluster
       |
       +-------------------+
       |                   |
       v                   v
 Node Exporter      kube-state-metrics
       |                   |
       +---------+---------+
                 |
                 v
            Prometheus
                 |
                 v
              Grafana
```

## Key DevOps Skills Demonstrated

This project demonstrates hands-on experience with:

- Linux administration
- Git and GitHub
- Maven application builds
- Docker image creation
- Jenkins Pipeline
- Kubernetes Deployments and Services
- Kubernetes networking
- NGINX reverse proxy
- PostgreSQL integration
- Prometheus monitoring
- Grafana dashboards
- Helm package management
- Kubernetes troubleshooting
- Linux disk and LVM management
- Application deployment validation

## Future Improvements

Possible improvements include:

- Kubernetes Ingress with TLS
- Automated Kubernetes deployment through Jenkins
- GitOps-based deployment using Argo CD
- Persistent Volume configuration and backup strategy
- Centralized application logging
- Prometheus alerting rules
- HTTPS and production domain configuration
- High-availability database architecture

## Author

**Jai Parkash**

DevOps Engineer

GitHub: `github.com/dauntlessjaypee`

LinkedIn: `linkedin.com/in/jaypee-dauntless`
