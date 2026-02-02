---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
Job Portal (Netflix UI) is a full-stack application featuring a Netflix-inspired scrolling interface for job listings. It is designed for free-tier deployment using FastAPI for the backend, React for the frontend, and PostgreSQL (Supabase) for the database.

## Repository Structure
The project is organized as a monorepo with separate directories for backend and frontend services.
- **backend/**: Python-based FastAPI application providing RESTful APIs and database management.
- **frontend/**: React-based web application with Tailwind CSS for styling and Vite as the build tool.
- **JobFlix/**: Likely a legacy or duplicate repository reference.
- **myvenv/**: Local Python virtual environment.

### Main Repository Components
- **Backend Service**: Manages job listings, user data, and applications.
- **Frontend Service**: Provides the user interface with signature Netflix-style horizontal scrolling.
- **Database**: PostgreSQL database managed via SQLAlchemy (production targets Supabase).

## Projects

### Backend (FastAPI)
**Configuration File**: [./backend/pyproject.toml](./backend/pyproject.toml)

#### Language & Runtime
**Language**: Python  
**Version**: 3.11+ (as per Dockerfile)  
**Build System**: uv / pip  
**Package Manager**: pip (referenced in setup)

#### Dependencies
**Main Dependencies**:
- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `sqlalchemy`: ORM
- `psycopg2-binary`: PostgreSQL driver
- `pydantic`: Data validation

**Development Dependencies**:
- `pytest`: Testing framework
- `httpx`: Async HTTP client for testing

#### Build & Installation
```bash
cd backend
pip install .
```

#### Docker
**Dockerfile**: [./backend/Dockerfile](./backend/Dockerfile)
**Image**: Built locally via docker-compose
**Configuration**: Uses `python:3.11-slim`, installs system dependencies for `psycopg2`, and runs on port 8000.

#### Testing
**Framework**: pytest
**Test Location**: Likely within `backend/` (standard pytest discovery)
**Run Command**:
```bash
cd backend
pytest
```

### Frontend (React + Vite)
**Configuration File**: [./frontend/package.json](./frontend/package.json)

#### Language & Runtime
**Language**: JavaScript / React  
**Version**: Node.js 18+ (as per Dockerfile)  
**Build System**: Vite  
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- `react`, `react-dom`: Core UI library
- `react-router-dom`: Routing
- `axios`: API client
- `framer-motion`: Animations
- `lucide-react`: Icons
- `tailwindcss`: Styling

**Development Dependencies**:
- `vite`: Build tool
- `autoprefixer`, `postcss`: CSS processing

#### Build & Installation
```bash
cd frontend
npm install
npm run build
```

#### Docker
**Dockerfile**: [./frontend/Dockerfile](./frontend/Dockerfile)
**Image**: Multi-stage build (Node build -> Nginx production)
**Configuration**: Serves static files via Nginx on port 80.

#### Testing
**Run Command**:
```bash
cd frontend
npm test
```

## Operations

### Global Setup
1. Configure environment variables in `.env`.
2. Launch the entire stack using Docker Compose:
```bash
docker-compose up --build
```

### Main Entry Points
- **Backend**: [./backend/main.py](./backend/main.py)
- **Frontend**: [./frontend/src/main.jsx](./frontend/src/main.jsx)
