# YesYouCan Cyber Secure — GRC & Sustainability MIS Platform

**Founder & CEO:** Dr. Noah Darko-Adjei  
**Strategic Advisor:** Christiana Konlan Kennedy  
**© 2025 YesYouCan Cyber Secure. All rights reserved.**

---

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js 14    │───▶│  Express Backend  │───▶│  MongoDB Atlas  │
│   (Port 3000)   │    │   (Port 5000)     │    │   (Free Tier)   │
│   TailwindCSS   │    │   Socket.IO       │    └─────────────────┘
│   Framer Motion │    │   JWT Auth        │    ┌─────────────────┐
│   Recharts      │    │   RBAC (6 roles)  │───▶│  Upstash Redis  │
└─────────────────┘    └──────────────────┘    │  (Sessions/KPI) │
                               │               └─────────────────┘
                               ▼
                    ┌──────────────────┐
                    │  FastAPI AI       │
                    │  (Port 8000)      │
                    │  ML Predictions   │
                    │  ESG Scoring      │
                    └──────────────────┘
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose (optional)
- MongoDB Atlas account (free) or local MongoDB

### 1. Clone & Setup

```bash
git clone <your-repo>
cd yesyoucan
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
npm install
npm run seed        # Seeds realistic test data
npm run dev         # Starts on port 5000
```

### 3. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local
# Edit if needed (defaults work for local dev)
npm install
npm run dev         # Starts on port 3000
```

### 4. AI Service Setup

```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 5. Docker Compose (All Services)

```bash
# From root directory
cp backend/.env.example backend/.env
# Edit backend/.env with real values

docker-compose up --build
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Access token secret (32+ chars) | `your-secret-here` |
| `JWT_REFRESH_SECRET` | Refresh token secret (32+ chars) | `another-secret` |
| `REDIS_URL` | Upstash Redis URL | `redis://...` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `CLIMATIQ_API_KEY` | Climatiq carbon API key (optional) | `...` |
| `CLOUDINARY_*` | Cloudinary credentials (optional) | `...` |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_SOCKET_URL` | Backend WebSocket URL |

---

## Test Accounts (After Seeding)

| Role | Email | Password |
|---|---|---|
| Super Admin | superadmin@yesyoucan.com | Password123! |
| Admin | admin@yesyoucan.com | Password123! |
| Analyst | analyst@yesyoucan.com | Password123! |
| Executive | executive@yesyoucan.com | Password123! |
| Employee | employee1@yesyoucan.com | Password123! |

---

## MongoDB Setup (Free Atlas Tier)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster (512MB)
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (development) or specific IPs (production)
5. Copy connection string → paste into `backend/.env` as `MONGODB_URI`
6. Run `npm run seed` to populate data

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
vercel --prod
# Set env vars in Vercel dashboard
```

### Backend → Railway
```bash
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard
# Auto-deploys on push
```

### AI Service → Railway or Render
```bash
# Connect ai-service directory
# Railway auto-detects Python/FastAPI
```

---

## API Endpoints

### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register org & admin |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh token |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |

### Core Modules
| Resource | Methods | Auth |
|---|---|---|
| `/api/risks` | GET, POST, PUT, DELETE | Analyst+ |
| `/api/compliance` | GET, POST, PUT | Analyst+ |
| `/api/emissions` | GET, POST, PUT, DELETE | Analyst+ |
| `/api/esg` | GET, POST | Analyst+ |
| `/api/suppliers` | GET, POST, PUT, DELETE | Analyst+ |
| `/api/audits` | GET, POST, PUT | Admin+ |
| `/api/incidents` | GET, POST, PUT | All roles |
| `/api/employees` | GET | All roles |
| `/api/dashboard/summary` | GET | All roles |
| `/api/dashboard/emissions-trend` | GET | All roles |
| `/api/dashboard/risk-heatmap` | GET | All roles |

### AI Service
| Method | Path | Description |
|---|---|---|
| POST | `/predict/emissions` | Forecast emissions |
| POST | `/score/risk` | Enhanced risk scoring |
| POST | `/score/supplier` | Supplier ESG composite |
| POST | `/detect/anomalies` | Z-score anomaly detection |
| POST | `/predict/compliance` | Compliance improvement forecast |

---

## Modules Implemented

| Module | Status | Features |
|---|---|---|
| Authentication | ✅ | JWT, refresh tokens, RBAC, account lockout |
| Dashboard | ✅ | Live KPIs, emissions trend, risk heatmap, compliance radar |
| Risk Management | ✅ | CRUD, heatmap, scoring, treatment plans, real-time updates |
| Compliance | ✅ | Multi-framework, control tracking, scoring, radar chart |
| Carbon Emissions | ✅ | Scope 1/2/3, trend charts, monthly tracking |
| ESG Analytics | ✅ | KPI dashboards, circular progress, progress bars |
| Suppliers | ✅ | ESG scoring, risk rating, Green/Amber/Red |
| Incidents | ✅ | Lifecycle, severity, regulatory flags, real-time alerts |
| Employees | ✅ | Leaderboard, points, badges, carbon saved |
| Audit | ✅ | Lifecycle, findings, evidence tracking |
| Reports | ✅ | Template library, PDF generation hooks |
| Admin | ✅ | User management, tenant settings |
| AI Engine | ✅ | Predictions, scoring, anomaly detection |
| WebSockets | ✅ | Real-time incident alerts, risk updates |

---

## Platform Identity

> **YesYouCan Cyber Secure — Integrated GRC & Sustainability MIS Platform**  
> *Founder & CEO: Dr. Noah Darko-Adjei*  
> *Strategic Advisor: Christiana Konlan Kennedy*  
> *"Integrating cybersecurity governance with sustainability intelligence for enterprise and government use."*  
> **© 2025 YesYouCan Cyber Secure. All rights reserved.**
