<div align="center">

# 📦 Product Inventory Management System

<p align="center">
  <strong>A production-ready, full-stack inventory platform built on the MERN stack.</strong><br/>
  Role-based access control · Real-time analytics · Atomic stock transactions · Swagger-documented REST APIs
</p>

<p align="center">
  <a href="https://product-inventory-management-system-omega.vercel.app/login">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-4F46E5?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<br/>

<p align="center">
  <!-- Stack -->
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/JWT-Auth-FB015B?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="Swagger"/>
  <img src="https://img.shields.io/badge/Jest-29.7-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest"/>
</p>

<p align="center">
  <!-- Repo stats -->
  <img src="https://img.shields.io/github/stars/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=gold" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=blue" alt="Forks"/>
  <img src="https://img.shields.io/github/issues/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=red" alt="Issues"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
</p>

</div>

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Project Highlights](#-project-highlights)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture Overview](#️-architecture-overview)
- [Folder Structure](#-folder-structure)
- [Database Models](#️-database-models)
- [Authentication & Authorization](#-authentication--authorization)
- [Role-Based Access Control](#-role-based-access-control)
- [Dashboard Features](#-dashboard-features)
- [Stock Management Workflow](#-stock-management-workflow)
- [Search, Filter & Pagination](#-search-filter--pagination)
- [API Overview](#-api-overview)
- [Installation Guide](#-installation-guide)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)
- [Testing](#-testing)
- [Security Features](#️-security-features)
- [Validation Rules](#-validation-rules)
- [Error Handling](#️-error-handling)
- [Business Rules](#-business-rules)
- [Performance Optimizations](#-performance-optimizations)
- [Challenges Faced](#-challenges-faced)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 📖 Overview

**Product Inventory Management System** is a production-ready, full-stack web application built on the **MERN** stack (MongoDB, Express.js, React, Node.js). It gives businesses a centralized platform to manage their product catalog, monitor real-time stock levels, track every stock movement through an atomic audit trail, and gain actionable insights from an interactive analytics dashboard.

The system enforces **role-based access control** (Admin vs. Staff), exposes **server-side validated REST APIs** fully documented via Swagger/OpenAPI, supports **CSV bulk import and export**, and ships with a **Jest + Supertest automated test suite** covering all critical API routes.

---

## 🌐 Live Demo

| Link | Description |
|---|---|
| 🔗 [Live Application](https://product-inventory-management-system-omega.vercel.app/login) | Hosted on Vercel — one-click demo credential autofill on the login page |
| 📘 [Swagger API Docs](http://localhost:3000/api-docs) | Interactive OpenAPI explorer (run locally) |

**Demo Credentials — no sign-up required:**

| Role | Email | Password | Access Level |
|---|---|---|---|
| 👑 **Admin** | `admin@inventory.com` | `admin123` | Full CRUD — Create, Read, Update, Delete |
| 👤 **Staff** | `staff@inventory.com` | `staff123` | Create, Read, Update + Stock Movements (no Delete) |

> 💡 The login page includes **one-click autofill buttons** for both demo roles.

---

## ✨ Project Highlights

| 🏆 Highlight | Detail |
|---|---|
| 🔐 Stateless JWT Auth | Bearer token flow with bcryptjs password hashing and 7-day token expiry |
| 👥 Role-Based Guards | Middleware-enforced Admin vs. Staff permissions at the route level |
| ⚛️ Atomic Transactions | MongoDB session transactions ensure stock writes never produce inconsistent state |
| 📊 Analytics Dashboard | 8 KPI cards, 30-day bar chart, and category valuation pie chart — all real-time |
| 🧪 Automated Test Suite | Jest + Supertest integration tests across Auth, Products, Categories, and Stock APIs |
| 📘 OpenAPI Documented | Every endpoint documented and explorable via Swagger UI |
| 📥📤 CSV Operations | Bulk import with per-row validation + filtered export as `.csv` |
| 🌱 One-Command Seeder | Pre-seeds 2 users, 3 categories, 3 suppliers, 20 products, and 30 days of movements |

---

## ✨ Features

### 🔐 Authentication
- Stateless login/logout with signed JWT (Bearer token flow)
- bcryptjs salted password hashing — plaintext passwords never stored
- Axios interceptors automatically inject the token on every outgoing request
- 7-day configurable token expiry

### 🗂️ Inventory Management
- Full **CRUD** for Products, Categories, and Suppliers
- SKU uniqueness enforced at the database and application layer
- Price tracked in PKR; stock quantity with min-0 constraint
- Cascade-delete protection — categories with linked products cannot be removed

### 📊 Dashboard & Analytics
- **8 KPI metric cards** — total products, categories, suppliers, inventory value, stock units, low-stock alerts, out-of-stock count, and today's movements
- **30-day Stock Movement Bar Chart** (Recharts `BarChart`) — daily IN vs. OUT volumes
- **Category Valuation Pie Chart** (Recharts `PieChart`) — inventory value breakdown by category

### 🔍 Search & Filtering
- Real-time debounced search (300ms) by product name or SKU
- Filter dropdowns for category, supplier, and stock status
- Server-side sorting by name, SKU, price, stock quantity, or creation date
- Server-side pagination — configurable page sizes: 5, 10, 20, or 50 items

### 📥 CSV Operations
- **Bulk Import** — drag-and-drop CSV upload with row-by-row validation, duplicate SKU detection, and per-import summary report
- **Export** — downloads the currently active filtered product view as a `.csv` file

### 🛡️ Security
- CORS restricted to the configured `CLIENT_URL` origin
- Joi schemas validate and strip unexpected fields from all request bodies
- MongoDB session transactions prevent partial writes during stock operations
- Role guards block Staff from performing deletion operations

### 🧪 Developer Experience
- Swagger UI at `/api-docs` — interactive, no Postman required for exploration
- Ready-to-import **Postman collection** included in `/postman`
- One-command database seeder with realistic demo data
- `.env.example` file documents every required environment variable

### ✅ Testing
- Jest + Supertest integration test suite covering Auth, Products, Categories, and Stock Movements
- Tests verify real HTTP request/response cycles against a dedicated test environment
- Coverage report available via `npm run test:coverage`

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | UI component architecture with Context API for global state |
| **Vite** | 6.1 | Build tooling and HMR-powered dev server |
| **Tailwind CSS** | v4 | Utility-first styling framework |
| **Recharts** | 2.15 | 30-day stock movement bar chart and category valuation pie chart |
| **Axios** | 1.7 | HTTP client with request/response interceptors for Bearer token injection |
| **Lucide Icons** | latest | Modern, consistent SVG icon set |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript server runtime |
| **Express.js** | 4 | REST API routing and middleware layer |
| **MongoDB Atlas** | — | Cloud-hosted NoSQL document database |
| **Mongoose** | 8.5 | ODM with schema validation and session transaction support |
| **JSON Web Token** | — | Stateless token issuance and verification |
| **bcryptjs** | — | Salted password hashing |
| **Joi** | 17.13 | Server-side request body and query parameter validation |
| **swagger-ui-express** | — | Serves interactive OpenAPI documentation at `/api-docs` |

### Testing & Tooling

| Technology | Purpose |
|---|---|
| **Jest** 29.7 | Test runner for integration tests |
| **Supertest** | HTTP assertions for API endpoint testing |
| **dotenv** | Environment variable loading |
| **cors** | Cross-Origin Resource Sharing configuration |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
│          React 18 + Vite + Tailwind CSS + Recharts              │
│       Context API · Axios Interceptors · Lucide Icons           │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP / REST  ·  Bearer JWT
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express.js REST API                          │
│                  Node.js 18  ·  Port 3000                       │
│                                                                 │
│  ┌─────────────┐  ┌────────────────┐  ┌──────────────────────┐ │
│  │ Auth Routes │  │ Product Routes │  │ Category / Supplier  │ │
│  │ /api/auth   │  │ /api/products  │  │ /api/categories      │ │
│  └──────┬──────┘  └──────┬─────────┘  │ /api/suppliers       │ │
│         │                │            └──────────────────────┘ │
│  ┌──────▼────────────────▼──────────────────────────────────┐  │
│  │                  Middleware Layer                         │  │
│  │     authMiddleware · roleGuard · Joi validators · CORS   │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│                             │                                   │
│  ┌──────────────────────────▼────────────────────────────────┐ │
│  │    Stock Movement Routes  /api/stock-movements            │ │
│  │    MongoDB Session Transactions (atomic write pairs)      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │    Dashboard Routes  /api/dashboard                        │ │
│  │    Aggregation pipelines — KPI stats + chart data         │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │  Mongoose ODM
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MongoDB Atlas (Cloud)                       │
│    Collections: users · products · categories ·                 │
│                 suppliers · stockmovements                      │
└─────────────────────────────────────────────────────────────────┘
```

**Request Lifecycle:** Every authenticated request passes through `authMiddleware`, which verifies the JWT and attaches the decoded user (including role) to `req.user`. Route-level `roleGuard` middleware enforces permission checks before any controller logic runs. All write operations pass through Joi validation schemas before touching the database.

---

## 📁 Folder Structure

```
Product-Inventory-Management-System/
├── backend/
│   ├── src/
│   │   ├── config/                  # DB connection, Swagger config
│   │   ├── controllers/             # Route handler logic
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── supplierController.js
│   │   │   └── stockMovementController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js    # JWT verification → req.user
│   │   │   └── roleGuard.js         # Role-based permission enforcement
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Supplier.js
│   │   │   └── StockMovement.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── categoryRoutes.js
│   │   │   ├── supplierRoutes.js
│   │   │   └── stockMovementRoutes.js
│   │   ├── validators/              # Joi validation schemas
│   │   ├── seed/                    # Database seed script
│   │   └── app.js                  # Express entry point
│   ├── tests/                       # Jest + Supertest integration suites
│   │   ├── auth.test.js
│   │   ├── products.test.js
│   │   ├── categories.test.js
│   │   └── stockMovements.test.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                     # Axios instance + API call helpers
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Categories/
│   │   │   ├── Suppliers/
│   │   │   ├── StockMovements/
│   │   │   └── common/
│   │   ├── context/                 # React Context API (auth state)
│   │   ├── pages/                   # Page-level components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CategoriesPage.jsx
│   │   │   ├── SuppliersPage.jsx
│   │   │   └── StockMovementsPage.jsx
│   │   ├── App.jsx                  # Router and layout
│   │   └── main.jsx                 # React DOM entry point
│   ├── index.html
│   └── package.json
│
├── postman/
│   └── ProductInventory.postman_collection.json
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Models

### User

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required · unique · lowercase |
| `password` | String | Required · bcrypt hashed |
| `role` | String (enum) | `admin` \| `staff` · default: `staff` |
| `createdAt` | Date | Auto-generated |

### Product

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `sku` | String | Required · unique |
| `description` | String | Optional |
| `price` | Number | Required · min: 0 (PKR) |
| `stockQuantity` | Number | Required · min: 0 |
| `category` | ObjectId | Ref: `Category` · required |
| `supplier` | ObjectId | Ref: `Supplier` · required |
| `createdAt` | Date | Auto-generated |

### Category

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required · unique |
| `description` | String | Optional |
| `createdAt` | Date | Auto-generated |

### Supplier

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required · unique |
| `email` | String | Optional · valid email format |
| `phone` | String | Optional |
| `address` | String | Optional |
| `createdAt` | Date | Auto-generated |

### StockMovement

| Field | Type | Constraints |
|---|---|---|
| `product` | ObjectId | Ref: `Product` · required |
| `type` | String (enum) | `in` \| `out` · required |
| `quantity` | Number | Required · min: 1 |
| `notes` | String | Optional |
| `performedBy` | ObjectId | Ref: `User` · required |
| `createdAt` | Date | Auto-generated |

---

## 🔒 Authentication & Authorization

The system uses **stateless JWT authentication**. On login, the server issues a signed JSON Web Token (7-day expiry). The client stores the token and Axios interceptors inject it as a `Bearer` header on every subsequent request.

**Authentication Flow:**

```
POST /api/auth/login
        │
        ▼
  Validate request body with Joi
        │
        ▼
  Fetch user by email from MongoDB
        │
        ▼
  Compare input password against bcrypt hash
        │
   ┌────┴────┐
 MATCH    NO MATCH
   │          │
   ▼          ▼
Sign JWT   401 Unauthorized
(payload: userId, role, email)
   │
   ▼
Client stores token
Axios interceptor injects token on all future requests
   │
   ▼
authMiddleware verifies JWT signature on every protected route
   │
   ▼
roleGuard checks req.user.role against required permissions
```

---

## 👥 Role-Based Access Control

| Action | Admin | Staff |
|---|:---:|:---:|
| View Dashboard & Analytics | ✅ | ✅ |
| View Products / Categories / Suppliers | ✅ | ✅ |
| Create Products / Categories / Suppliers | ✅ | ✅ |
| Update Products / Categories / Suppliers | ✅ | ✅ |
| **Delete** Products / Categories / Suppliers | ✅ | ❌ |
| Record Stock Movements (IN / OUT) | ✅ | ✅ |
| View Stock Movement History | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Import CSV | ✅ | ✅ |

> [!NOTE]
> Role is embedded in the JWT payload and re-verified server-side on every request — no client-side role spoofing is possible.

---

## 📊 Dashboard Features

The analytics dashboard aggregates and presents a real-time summary of the entire inventory state using MongoDB aggregation pipelines.

**KPI Metric Cards (8 total):**

| Metric | Description |
|---|---|
| 📦 Total Products | Count of all products in the catalog |
| 🗂️ Total Categories | Count of product categories |
| 🏭 Total Suppliers | Count of registered suppliers |
| 💰 Total Inventory Value | Sum of `price × stockQuantity` across all products (PKR) |
| 📊 Total Stock Units | Aggregate stock quantity across all products |
| ⚠️ Low Stock Alerts | Products with `1 ≤ stockQuantity ≤ 10` |
| 🚫 Out of Stock | Products with `stockQuantity === 0` |
| 🔄 Today's Movements | Stock movements recorded on the current calendar day |

**Visual Charts:**

- **30-Day Stock Movement Bar Chart** — Daily Stock IN vs. Stock OUT volumes over the past 30 days, rendered with Recharts `<BarChart>`
- **Category Valuation Pie Chart** — Total inventory value broken down by product category, rendered with Recharts `<PieChart>`

---

## 📦 Stock Management Workflow

Stock IN and Stock OUT operations are executed atomically using **MongoDB session transactions**. This guarantees that the `StockMovement` document creation and the `Product.stockQuantity` update always succeed or fail together — eliminating any risk of data inconsistency.

```
User submits Stock OUT (quantity: 50)
              │
              ▼
  authMiddleware + Joi validation
              │
              ▼
  Fetch product.stockQuantity from DB
              │
      stockQuantity ≥ 50 ?
      /                   \
    YES                    NO
     │                      │
     ▼                      ▼
Start MongoDB          HTTP 400 Bad Request
Transaction            "Insufficient stock"
     │
     ▼
Create StockMovement doc (type: "out", qty: 50)
     │
     ▼
Decrement product.stockQuantity by 50
     │
     ▼
Commit Transaction → HTTP 201 Created
```

**Stock Status Thresholds:**

| Status | Condition | Dashboard Badge |
|---|---|---|
| `in_stock` | `stockQuantity > 10` | 🟢 Green |
| `low_stock` | `1 ≤ stockQuantity ≤ 10` | 🟡 Yellow |
| `out_of_stock` | `stockQuantity === 0` | 🔴 Red |

---

## 🔍 Search, Filter & Pagination

All filtering, sorting, and pagination logic runs **server-side** — no full-collection fetching occurs on the backend. Every query is translated directly into a MongoDB query with the appropriate filters and sort order applied.

**Supported query parameters on `GET /api/products`:**

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Partial match on `name` or `sku` (case-insensitive regex) |
| `category` | ObjectId | Filter by category ID |
| `supplier` | ObjectId | Filter by supplier ID |
| `status` | string | `in_stock` / `low_stock` / `out_of_stock` |
| `sortBy` | string | `name`, `sku`, `price`, `stockQuantity`, `createdAt` |
| `order` | string | `asc` or `desc` |
| `page` | number | Page number (default: `1`) |
| `limit` | number | Items per page: 5, 10, 20, or 50 (default: `10`) |

> [!TIP]
> The frontend applies a **300ms debounce** to the search input to avoid hammering the API while the user types.

---

## 📡 API Overview

> Complete, interactive API documentation is available through **Swagger UI** at `/api-docs` when running locally.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register a new user |
| `POST` | `/api/auth/login` | None | Login and receive a signed JWT |
| `GET` | `/api/auth/me` | Bearer | Get the authenticated user's profile |

### Products

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/products` | All | List products with search, filter, sort, paginate |
| `GET` | `/api/products/:id` | All | Get a single product by ID |
| `POST` | `/api/products` | All | Create a new product |
| `PUT` | `/api/products/:id` | All | Update a product |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |
| `GET` | `/api/products/export/csv` | All | Export filtered products as CSV |
| `POST` | `/api/products/import/csv` | All | Bulk import products from CSV |

### Categories

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/categories` | All | List all categories |
| `GET` | `/api/categories/:id` | All | Get a category by ID |
| `POST` | `/api/categories` | All | Create a new category |
| `PUT` | `/api/categories/:id` | All | Update a category |
| `DELETE` | `/api/categories/:id` | Admin | Delete (blocked if products are linked) |

### Suppliers

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/suppliers` | All | List all suppliers |
| `GET` | `/api/suppliers/:id` | All | Get a supplier by ID |
| `POST` | `/api/suppliers` | All | Create a new supplier |
| `PUT` | `/api/suppliers/:id` | All | Update a supplier |
| `DELETE` | `/api/suppliers/:id` | Admin | Delete a supplier |

### Stock Movements

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/stock-movements` | All | List movements — filterable by type, date, product |
| `POST` | `/api/stock-movements` | All | Record a new Stock IN or Stock OUT |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Fetch all 8 KPI metric values |
| `GET` | `/api/dashboard/chart-data` | 30-day movement data + category valuation breakdown |

---

## 🚀 Installation Guide

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | ≥ 18.0.0 |
| **npm** | ≥ 9.0.0 |
| **Git** | Any recent version |
| **MongoDB Atlas Account** | Free tier is sufficient |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/mshahnawaz1202/Product-Inventory-Management-System.git
cd Product-Inventory-Management-System
```

---

### Step 2 — Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Open `.env` and fill in the values — see the [Environment Variables](#-environment-variables) section below.

---

### Step 3 — Backend Setup

```bash
# From the backend/ directory
npm install

# Seed the database with demo data (optional but recommended)
npm run seed

# Start the development server
npm run dev
```

- REST API: `http://localhost:3000/api`
- Swagger Docs: `http://localhost:3000/api-docs`

---

### Step 4 — Frontend Setup

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```

- Frontend App: `http://localhost:5173`

---

## 🔑 Environment Variables

Create `backend/.env` using the template below:

```env
DATABASE_URL="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
PORT=3000
NODE_ENV=development
JWT_SECRET="your-secret-key-minimum-32-characters"
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

| Variable | Required | Description |
|---|:---:|---|
| `DATABASE_URL` | ✅ | MongoDB Atlas connection string |
| `PORT` | ✅ | Express server port (default: `3000`) |
| `NODE_ENV` | ✅ | `development` or `production` |
| `JWT_SECRET` | ✅ | Secret key for JWT signing — keep this private |
| `JWT_EXPIRES_IN` | ✅ | Token expiry duration e.g. `7d`, `24h` |
| `CLIENT_URL` | ✅ | Frontend origin added to the CORS allowlist |

> [!IMPORTANT]
> Never commit your `.env` file. It is already listed in `.gitignore`. Use `.env.example` as the canonical reference.

---

## 💻 Local Development

Quick reference for running both services locally:

| Service | URL |
|---|---|
| **Frontend Application** | `http://localhost:5173` |
| **Backend REST API** | `http://localhost:3000/api` |
| **Swagger / OpenAPI Docs** | `http://localhost:3000/api-docs` |
| **Postman Collection** | `./postman/ProductInventory.postman_collection.json` |

**Database Seeder — what gets created:**

| Entity | Count | Details |
|---|---|---|
| Users | 2 | Admin + Staff with pre-hashed passwords |
| Categories | 3 | Sample product categories |
| Suppliers | 3 | Sample supplier records |
| Products | 20 | Varied stock levels (in-stock, low, out-of-stock) |
| Stock Movements | Multiple | Historical movements spread over the past 30 days |

---

## 🧪 Testing

The backend ships with a **Jest + Supertest** integration test suite. Tests exercise real HTTP request/response cycles against a dedicated test environment — no mocking of the database layer.

```bash
cd backend

# Run all test suites
npm test

# Run with coverage report
npm run test:coverage
```

**Test Coverage by Suite:**

| Suite | Scenarios Covered |
|---|---|
| **Auth API** | Registration, duplicate email rejection, login validation, invalid credentials, JWT-protected route access |
| **Product API** | SKU uniqueness enforcement, negative price rejection, search/filter query correctness, Admin-only deletion guard |
| **Category API** | Creation, duplicate name detection, cascade-delete prevention when products are linked |
| **Stock Movement API** | Atomic balance updates, insufficient-stock rejection (`HTTP 400`), movement type filtering, date-range filtering |

---

## 🛡️ Security Features

| Feature | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with salted rounds — plaintext passwords are never stored or logged |
| **Stateless Auth** | JWT with configurable expiry — no server-side sessions or persistent auth state |
| **CORS Protection** | Requests accepted only from the configured `CLIENT_URL` origin |
| **Role-Based Guards** | `roleGuard` middleware enforces Admin/Staff permissions at the route level |
| **Input Sanitization** | Joi schemas validate and strip unexpected fields from all incoming request bodies |
| **Cascade Delete Guard** | Categories with linked products cannot be deleted — prevents orphaned document references |
| **Transaction Integrity** | Stock movement creation and quantity update are committed or rolled back together via MongoDB sessions |

---

## ✅ Validation Rules

All validation is enforced **server-side** using Joi schemas before any database operation is attempted. Client-side errors are never the sole line of defence.

| Resource | Validated Fields |
|---|---|
| **User Registration** | `name` (required), `email` (valid format, unique), `password` (min 6 chars), `role` (enum) |
| **Product** | `name` (required), `sku` (required, unique), `price` (number, ≥ 0), `stockQuantity` (integer, ≥ 0), `category` (valid ObjectId), `supplier` (valid ObjectId) |
| **Category** | `name` (required, unique) |
| **Supplier** | `name` (required), `email` (valid format, optional) |
| **Stock Movement** | `product` (valid ObjectId), `type` (enum: `in`/`out`), `quantity` (integer, ≥ 1) |
| **Query Parameters** | `page`, `limit`, `sortBy`, `order`, `status` all validated against explicit allowed-value lists |

---

## ⚠️ Error Handling

The API returns consistent, structured JSON error responses across all routes — no bare Express stack traces exposed to clients.

```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": ["Detailed validation error messages if applicable"]
}
```

| HTTP Status | Scenario |
|---|---|
| `400 Bad Request` | Joi validation failure, insufficient stock for OUT, duplicate SKU/email |
| `401 Unauthorized` | Missing, expired, or malformed JWT token |
| `403 Forbidden` | Valid token but insufficient role permissions (e.g., Staff attempting deletion) |
| `404 Not Found` | Requested resource does not exist |
| `409 Conflict` | Duplicate unique-field violation (SKU, email, category name) |
| `500 Internal Server Error` | Unexpected server-side exception |

---

## 📋 Business Rules

- **SKU Uniqueness** — Every product must have a unique Stock Keeping Unit identifier; duplicates are rejected at the validation and database layers.
- **Oversell Prevention** — A Stock OUT request that would produce a negative quantity is rejected before any database write occurs.
- **Cascade Protection** — A category cannot be deleted while any products are assigned to it, preventing orphaned product references.
- **Atomic Transactions** — Stock movement creation and product quantity updates are wrapped in a MongoDB session and committed or rolled back as a single unit.
- **Low Stock Threshold** — Products with `stockQuantity` between 1 and 10 (inclusive) are flagged as Low Stock across the dashboard and product list.
- **Admin-Only Deletion** — Only users with the `admin` role may delete products, categories, or suppliers. Staff receive a `403 Forbidden` response.
- **Demo Credential Autofill** — The login page exposes one-click fill buttons for both demo roles to streamline evaluation.

---

## ⚡ Performance Optimizations

- **Server-Side Pagination** — Only the requested page of documents is fetched from MongoDB; no full-collection scans on list endpoints.
- **Debounced Search** — A 300ms frontend debounce prevents excessive API calls during rapid typing.
- **MongoDB Aggregation Pipelines** — Dashboard KPI stats and chart data are computed server-side via aggregation rather than fetching and processing documents in JavaScript.
- **Mongoose Lean Queries** — Read-only list endpoints use `.lean()` to return plain JavaScript objects instead of full Mongoose documents, reducing overhead.
- **Selective Field Population** — `populate()` calls specify only the fields required by the response, avoiding over-fetching of referenced documents.
- **Indexed Fields** — Unique fields (`email`, `sku`, `name` on Category/Supplier) are backed by MongoDB unique indexes, making lookups and uniqueness checks O(log n).

---

## 🧗 Challenges Faced

**1. Atomic Stock Operations**
Ensuring that `StockMovement` creation and `Product.stockQuantity` mutation never diverged required implementing MongoDB multi-document session transactions — not a common pattern in introductory MERN tutorials.

**2. Server-Side Filtering Architecture**
Building a composable query object that correctly merges search regex, category/supplier ObjectId filters, stock status thresholds, sort directives, and pagination offsets into a single efficient MongoDB query took considerable design iteration.

**3. CSV Import Validation**
Row-by-row validation with meaningful per-row error messages, duplicate SKU detection across both the CSV file itself and the existing database state, and returning a structured import summary all had to be handled within a single controller action.

**4. Role Guard Design**
Designing a reusable `roleGuard` middleware factory that could be applied per-route without duplicating permission logic — while remaining transparent in Swagger documentation — required careful Express middleware composition.

---

## 🔮 Future Improvements

| Idea | Description |
|---|---|
| 🐳 **Docker & Docker Compose** | Containerize backend, frontend, and MongoDB for one-command local setup |
| ⚡ **Redis Caching** | Cache dashboard aggregations and frequently-read lookups to reduce DB load |
| 🏭 **Multi-Warehouse Support** | Track stock levels independently per warehouse or location |
| 📷 **Barcode Scanner Integration** | Add product lookup and stock recording via device camera barcode scan |
| 📧 **Email Notifications** | Low-stock and out-of-stock alerts delivered via automated email |
| 📄 **PDF Reports** | Exportable inventory and movement reports in PDF format |
| 🌙 **Dark Mode** | System-aware dark/light theme toggle |
| 📱 **Mobile App** | React Native companion app for warehouse staff |
| 📊 **Advanced Analytics** | Trend forecasting, reorder-point suggestions, and historical comparisons |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes with a clear message
git commit -m "feat: add barcode scanner support"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request against main
```

Please follow the existing code style, add tests for new features, and update the Swagger JSDoc comments for any new or modified endpoints.

---

## 👤 Author

<div align="center">

**Muhammad Shah Nawaz**

[![GitHub](https://img.shields.io/badge/GitHub-mshahnawaz1202-181717?style=for-the-badge&logo=github)](https://github.com/mshahnawaz1202)

*Built as a full-stack portfolio project demonstrating MERN stack proficiency, REST API design, role-based security, transactional database operations, data visualization, and automated testing.*

</div>

---


## 🙏 Acknowledgements

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — generous free tier for cloud database hosting
- [Vercel](https://vercel.com) — seamless frontend deployment
- [Recharts](https://recharts.org) — elegant chart components for React
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express) — zero-friction OpenAPI documentation serving
- [Joi](https://joi.dev) — expressive, powerful schema validation for Node.js
- [Lucide Icons](https://lucide.dev) — clean, consistent open-source icon set

---

<div align="center">

If this project helped you or impressed you, consider giving it a ⭐ — it helps others discover it!

[![GitHub Stars](https://img.shields.io/github/stars/mshahnawaz1202/Product-Inventory-Management-System?style=social)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System)

</div>
