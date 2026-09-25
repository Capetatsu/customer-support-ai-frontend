# AI Customer Intelligence & Resolution Agent — Student 4 Frontend

Production-quality frontend and operator dashboard built for the **AI Customer Intelligence + Resolution Agent** hackathon project.

Designed according to the **Refero black-void visual design language** (`#000000` canvas, `#ffffff` primary text, `#8052ff` violet action accent, `#ffb829` amber sparks, and monolithic weightless typography).

---

## 1. Project Overview & Role Breakdown

The project combines an **Intelligence Engine** that learns from complaints and reviews with an **AI Resolution Agent** that investigates individual cases, retrieves evidence, and proposes actions under human approval gates:

- **Student 1 (Backend & Database)**: FastAPI service, SQLite/PostgreSQL schemas (`customers`, `orders`, `complaints`, `cases`, `resolutions`), JWT authentication.
- **Student 2 (NLP & Clustering)**: Complaint preprocessing, intent classification, sentiment analysis, severity determination, embeddings, HDBSCAN/K-Means semantic clustering, emerging trend detection.
- **Student 3 (AI Resolution Agent)**: 10-step investigation workflow (Intake → Classify → Retrieve Context → Policy Check → Similar Cases → Investigate → Recommend → Guardrails → Execute/Approval → Learn).
- **Student 4 (Frontend + Dashboard — THIS REPO)**: Reusable, production-grade operations interface and complaint intake flow that ties together the outputs from Students 1, 2, and 3 into a single unified product.

---

## 2. Visual Design DNA (Refero / Dala Translation)

- **Canvas**: Pure `#000000` void (never dark gray panels or bulky card boxes).
- **Typography**: Inter / geometric sans with weight 400 headlines at large scale (28–56px) and negative tracking (`-0.03em` to `-0.04em`). Scale and spacing create hierarchy rather than heavy bold fonts everywhere.
- **Data Accents**:
  - Primary Action / Active States: `#8052ff` (Electric Iris pill buttons).
  - Attention / Spikes: `#ffb829` (Saffron Spark).
  - Verified / Safe: `#15846e` (Deep Verdant).
  - Tabular Numerals: Monospace figures (`tabular-nums font-mono`) for metrics, IDs, timestamps, and percentages.
- **Anti-AI Dashboard Rules**: No fake neon gradients, no sci-fi floating holograms, no robot illustrations, and no promotional "AI MAGIC" badges. Pure operational clarity.

---

## 3. Implemented Routes & Experiences

| Route | View Description |
|---|---|
| `/dashboard` | Executive overview: key metrics (Total, Open, High Severity, Escalations), SVG complaint volume trend chart (7D/30D/90D), emerging issue clusters with growth rates, and recent complaints table. |
| `/complaints` | High-density complaint table with real-time multi-dimensional filtering (Category, Severity, Status, Sentiment, Search) and quick navigation. |
| `/complaints/new` | Customer intake experience: natural language complaint description, customer/order context, optional attachment upload, and animated 3-step pipeline simulation. |
| `/complaints/:id` | Full complaint & investigation workspace following strict information hierarchy: Customer Message (hero) → Customer Context → Order Context → Student 2 Intelligence → Investigation Timeline → Evidence & Similar Cases → Student 3 Recommendation → Human Approval Gate. |
| `/cases` | Case audit history table with status filters (Investigating, Pending Approval, Resolved, Escalated). |
| `/approvals` | Dedicated human approval queue for high-consequential actions (e.g. Refunds, Cancellations) with Approve, Modify, and Reject with confirmation dialog. |
| `/analytics` | Deep-dive Intelligence Engine analytics: volume trends, category distribution, sentiment polarity mix, severity breakdown, and semantic cluster drill-down modal with contributing hypotheses. |
| `/login` | Operator authentication portal ready for FastAPI JWT integration. |

---

## 4. Architecture & Service Layer

```
src/
├── types/              # Typed TypeScript contracts (Complaint, Order, Customer, Trend, Case, Recommendation)
├── data/               # Realistic mock repository (35+ complaints, orders, customers, and cases)
├── services/           # Service abstraction layer (clean swap between mock and FastAPI)
│   ├── api.ts          # Base configuration & VITE_API_BASE_URL
│   ├── auth.ts         # JWT authentication client
│   ├── complaints.ts   # Ingestion and query service
│   ├── orders.ts       # Order context retrieval
│   ├── customers.ts    # Customer 360 profile service
│   ├── cases.ts        # Case workflow, approvals, modifications & rejections
│   └── analytics.ts    # Trend & telemetry service
├── components/
│   ├── layout/         # AppShell, Topbar, Sidebar with Refero angular logo mark
│   ├── dashboard/      # Overview, TrendChart (pure SVG)
│   ├── complaints/     # ComplaintListView, ComplaintDetailView, NewComplaintView
│   ├── cases/          # CaseListView
│   ├── approvals/      # ApprovalsView (Human-in-the-loop gate)
│   ├── analytics/      # AnalyticsView, TrendDetailModal
│   ├── auth/           # LoginView, RegisterView
│   └── ui/             # Badges, Toast notifications
└── contracts/          # Shared hackathon data contracts (data_formats.json)
```

---

## 5. Integration With Other Students

When teammates finish their backend and model services, update `.env`:

```env
VITE_API_BASE_URL="http://localhost:8000"
```

The service layer in `src/services/` will direct calls to:
- `POST /auth/login` & `POST /auth/register` (Student 1)
- `GET /customers/:id` & `GET /orders/:id` (Student 1)
- `POST /complaints` (Student 1)
- `POST /analyze` (Student 2 Intelligence)
- `POST /resolve` (Student 3 Resolution Agent)

Currently, the service layer operates against local in-memory state with complete realism for standalone demos and hackathon judging.
