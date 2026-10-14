# GII Project Stack

This document describes the technology stack for the GII website and future platform.

**Today:** this repository is mainly a **frontend** website.  
**Later:** a **backend** and databases will be added, based on `docs/gII-webpage.docx`.

---

## Frontend (currently in use)

These tools power the website you see in the browser.

| Technology | What it is | What we use it for |
|---|---|---|
| **Next.js** | A React framework for building websites | Pages, routing, image optimization, and app structure |
| **React** | UI library | Building interactive components (navbar, hero, cards, forms) |
| **TypeScript** | JavaScript with types | Safer code and clearer component/data structures |
| **Tailwind CSS** | Utility-first CSS framework | Styling layout, spacing, colors, and responsive design |
| **next-intl** | Internationalization library | English / German translations and locale routes (`/en`, `/de`) |
| **next-themes** | Theme helper | Light / dark mode switching |
| **GSAP** | Animation library | Scroll and motion effects (e.g. reveal animations) |
| **OGL** | Lightweight WebGL library | Canvas / visual background effects (e.g. DotField) |
| **react-icons** | Icon pack | UI icons for buttons, contact, footer, etc. |
| **ESLint** | Code quality tool | Catching common mistakes during development |

### Frontend in one sentence

**Next.js + React + TypeScript** build the pages, **Tailwind** styles them, **next-intl** makes them multilingual, and **GSAP / OGL** add motion and visual effects.

---

## Backend (planned — not built in this repo yet)

From the project architecture document (`gII-webpage.docx`), the future platform should use:

| Technology | What it is | What we use it for |
|---|---|---|
| **NestJS + TypeScript** | Backend framework | APIs, business logic, auth, modules (CMS, CRM, projects, partners) |
| **Node.js** | JavaScript runtime | Running the NestJS server |
| **PostgreSQL** | Main database | Storing users, leads, projects, articles, partners, and other structured data |
| **Redis** | Fast in-memory store | Caching and background job queues |
| **OpenSearch / Elasticsearch** | Search engine | Fast search across partners, projects, knowledge content |
| **Python + FastAPI** | Separate API service | AI-related features later |
| **MQTT + EMQX/Mosquitto** | IoT messaging | Device data / sensor communication later |
| **TimescaleDB** | Time-series database (when needed) | IoT / monitoring history |
| **S3-compatible object storage** | File storage | Images, videos, PDFs, uploads, and other media files |
| **Docker + Linux** | Containers + OS | Packaging and running services consistently |
| **Nginx** | Reverse proxy | Routing traffic to the app securely |
| **OAuth 2.0 / OpenID Connect + MFA** | Authentication standards | Secure login and multi-factor auth |
| **REST + OpenAPI** | API style + docs | Clear, documented backend APIs |
| **WebSockets** | Real-time connection | Live updates / dashboards later |
| **Prometheus + Grafana** | Monitoring | Health, metrics, and alerts |
| **GitHub Actions / GitLab CI** | CI/CD | Automated testing and deployment |

### Important architecture idea

Start as a **modular monolith**: one well-structured backend with clear modules (Website/CMS, Projects, Knowledge Center, CRM/Leads, etc.). Split into separate services later only if a module becomes very large (for example IoT or marketplace).

---

## How the pieces fit together

```text
Browser (user)
   │
   ▼
Frontend: Next.js + React + TypeScript
   │
   ▼  (future)
Backend API: NestJS
   │
   ├── PostgreSQL        → structured data
   ├── Redis             → cache / queues
   ├── Object storage    → images, videos, files
   ├── OpenSearch        → search
   └── FastAPI (later)   → AI features
```

---

## Simple definitions

- **Frontend** = what users see and click.
- **Backend** = the server that handles data, login, forms, and business rules.
- **Database (PostgreSQL)** = stores information like users, projects, and leads.
- **Object storage** = stores files like images, videos, and PDFs.
- **API** = the bridge that lets frontend and backend talk to each other.

---

## Current vs planned

| Area | Status in this repo |
|---|---|
| Website UI (pages, components, i18n, theme) | **In use** |
| NestJS backend | **Planned** |
| PostgreSQL / Redis / object storage | **Planned** |
| Auth, CRM, CMS modules | **Planned** |

When backend work starts, this file should be updated to match what is actually implemented.
