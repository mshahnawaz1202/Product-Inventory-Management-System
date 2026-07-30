<div align="center">

# 📦 Product Inventory Management System

### A full-stack MERN inventory platform with real-time stock tracking, role-based access control, data visualization, and automated testing

[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite_6.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js_18-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js_4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Mongoose](https://img.shields.io/badge/Mongoose_8.5-880000?style=flat-square&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Axios](https://img.shields.io/badge/Axios_1.7-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![Recharts](https://img.shields.io/badge/Recharts_2.15-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white)](https://recharts.org/)
[![Jest](https://img.shields.io/badge/Jest_29.7-C21325?style=flat-square&logo=jest&logoColor=white)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger_UI-85EA2D?style=flat-square&logo=swagger&logoColor=black)](https://swagger.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Last Commit](https://img.shields.io/github/last-commit/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=blue)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=green)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System)
[![Top Language](https://img.shields.io/github/languages/top/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=orange)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System)
[![Issues](https://img.shields.io/github/issues/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=red)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System/issues)
[![Stars](https://img.shields.io/github/stars/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=yellow)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System/stargazers)
[![Forks](https://img.shields.io/github/forks/mshahnawaz1202/Product-Inventory-Management-System?style=flat-square&color=purple)](https://github.com/mshahnawaz1202/Product-Inventory-Management-System/forks)

</div>

---

## 📖 Project Overview

**Product Inventory Management System** is a production-ready, full-stack web application built on the **MERN** stack (MongoDB, Express.js, React, Node.js). It provides businesses with a centralized platform to manage their product catalog, monitor real-time stock levels, track stock movements with an atomic audit trail, and gain inventory insights through an interactive analytics dashboard.

The system enforces **role-based access control** (Admin vs. Staff), features **server-side validated REST APIs** documented via Swagger/OpenAPI, supports **CSV bulk import and export**, and includes a **Jest + Supertest automated test suite** covering all critical API routes.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **JWT Authentication** | Stateless login/logout with Bearer token flow and bcryptjs password hashing |
| 👥 **Role-Based Access Control** | Admin has full CRUD; Staff can create, read, update products and record stock movements |
| 📊 **Analytics Dashboard** | 8 KPI metric cards, 30-day stock movement bar chart, and category valuation pie chart |
| 🗂️ **Product Catalog CRUD** | Full create, read, update, and delete with SKU, price (PKR), stock quantity, category, and supplier |
| 🔍 **Search, Filter & Sort** | Real-time debounced search by name/SKU, category/supplier dropdowns, stock status filter, and server-side sorting |
| 📄 **Server-Side Pagination** | Configurable page sizes: 5, 10, 20, or 50 items per page |
| 📦 **Stock Movement Audit Log** | Atomic stock IN / OUT operations via MongoDB transactions, with full movement history |
| 🚫 **Oversell Protection** | Stock OUT requests exceeding current inventory are rejected with `HTTP 400` |
| 📥 **CSV Bulk Import** | Drag-and-drop CSV upload with row-by-row validation, duplicate SKU detection, and import summary |
| 📤 **CSV Export** | Exports the currently filtered product catalog as a `.csv` file download |
| ✅ **Joi Validation** | Comprehensive server-side validation on all request bodies and query parameters |
| 🧪 **Automated Testing** | Jest & Supertest integration test suite for Auth, Product, Category, and Stock Movement APIs |
| 📘 **Swagger / OpenAPI Docs** | Interactive API documentation at `/api-docs` |
| 📬 **Postman Collection** | Ready-to-import collection included in the `/postman` directory |
| 🌱 **Database Seeder** | One-command seed script: 2 users, 3 categories, 3 suppliers, 20 products, and stock movement history |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | UI component architecture with Context API for state management |
| **Vite** | 6.1 | Build tooling and HMR-powered development server |
| **Tailwind CSS** | v4 | Utility-first styling framework |
| **Recharts** | 2.15 | Responsive bar chart (30-day stock movements) and pie chart (category valuation) |
| **Axios** | 1.7 | HTTP client with request/response interceptors for Bearer token injection |
| **Lucide Icons** | latest | Modern SVG icon library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 4 | REST API routing and middleware layer |
| **MongoDB Atlas** | — | Cloud-hosted NoSQL document database |
| **Mongoose** | 8.5 | ODM with schema validation and MongoDB session transactions |
| **JSON Web Token** | — | Stateless authentication token issuance and verification |
| **bcryptjs** | — | Salted password hashing |
| **Joi** | 17.13 | Server-side request body and query parameter validation |
| **swagger-ui-express** | — | Serves interactive OpenAPI documentation |
| **Jest** | 29.7 | Test runner for integration tests |
| **Supertest** | — | HTTP assertions for API endpoint testing |
| **dotenv** | — | Environment variable loading |
| **cors** | — | Cross-Origin Resource Sharing configuration |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
│          React 18 + Vite + Tailwind CSS + Recharts              │
│     (Context API · Axios Interceptors · Lucide Icons)           │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP / REST (Bearer JWT)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express.js REST API                          │
│              (Node.js 18 · Port 3000)                           │
│                                                                 │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────┐ │
│  │ Auth Routes  │  │ Product Routes│  │ Category / Supplier  │ │
│  │ /api/auth    │  │ /api/products │  │ /api/categories      │ │
│  └──────┬───────┘  └──────┬────────┘  │ /api/suppliers       │ │
│         │                 │           └──────────────────────┘ │
│  ┌──────▼─────────────────▼─────────────────────────────────┐  │
│  │              Middleware Layer                             │  │
│  │  authMiddleware · roleGuard · Joi validators · CORS      │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             │                                   │
│  ┌──────────────────────────▼─────────────────────────────────┐ │
│  │     Stock Movement Routes   /api/stock-movements           │ │
│  │     (MongoDB Session Transactions)                         │ │
│  └──────────────────────────────────────────────────────────-─┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │  Mongoose ODM
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas (Cloud)                        │
│   Collections: users · products · categories ·                 │
│                suppliers · stockmovements                       │
└─────────────────────────────────────────────────────────────────┘
```

**Request Lifecycle:** Every authenticated request passes through the `authMiddleware` which verifies the JWT and attaches the decoded user (including role) to `req.user`. Route-level `roleGuard` middleware then enforces permission checks before the controller logic executes. All write operations are validated by Joi schemas before touching the database.

---

## 📁 Folder Structure

```
Product-Inventory-Management-System/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection, Swagger config
│   │   ├── controllers/        # Route handler logic
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── supplierController.js
│   │   │   └── stockMovementController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js   # JWT verification
│   │   │   └── roleGuard.js        # Role-based permission check
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
│   │   ├── validators/         # Joi validation schemas
│   │   ├── seed/               # Database seed script
│   │   └── app.js              # Express app entry point
│   ├── tests/                  # Jest + Supertest test suites
│   │   ├── auth.test.js
│   │   ├── products.test.js
│   │   ├── categories.test.js
│   │   └── stockMovements.test.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios instance + API call helpers
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Categories/
│   │   │   ├── Suppliers/
│   │   │   ├── StockMovements/
│   │   │   └── common/
│   │   ├── context/            # React Context API (auth state)
│   │   ├── pages/              # Page-level components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CategoriesPage.jsx
│   │   │   ├── SuppliersPage.jsx
│   │   │   └── StockMovementsPage.jsx
│   │   ├── App.jsx             # Router and layout
│   │   └── main.jsx            # React DOM entry point
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

## 🗄️ Database Schema / Models

### User

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, bcrypt hashed |
| `role` | String (enum) | `admin` \| `staff`; default: `staff` |
| `createdAt` | Date | Auto-generated |

### Product

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required |
| `sku` | String | Required, unique |
| `description` | String | Optional |
| `price` | Number | Required, min: 0 (PKR) |
| `stockQuantity` | Number | Required, min: 0 |
| `category` | ObjectId | Ref: `Category`, required |
| `supplier` | ObjectId | Ref: `Supplier`, required |
| `createdAt` | Date | Auto-generated |

### Category

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, unique |
| `description` | String | Optional |
| `createdAt` | Date | Auto-generated |

### Supplier

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, unique |
| `email` | String | Optional, valid email format |
| `phone` | String | Optional |
| `address` | String | Optional |
| `createdAt` | Date | Auto-generated |

### StockMovement

| Field | Type | Constraints |
|---|---|---|
| `product` | ObjectId | Ref: `Product`, required |
| `type` | String (enum) | `in` \| `out`, required |
| `quantity` | Number | Required, min: 1 |
| `notes` | String | Optional |
| `performedBy` | ObjectId | Ref: `User`, required |
| `createdAt` | Date | Auto-generated |

---

## 🔒 Authentication & Authorization

The system uses **stateless JWT authentication**. Upon login, the server issues a signed JSON Web Token (7-day expiry) which the client stores and sends as a `Bearer` token in every subsequent request header via Axios interceptors.

**Authentication Flow:**

```
1. POST /api/auth/login  →  Validate credentials
2. Server hashes input password with bcryptjs and compares to stored hash
3. On match → sign JWT (payload: userId, role, email)
4. Client stores token → Axios interceptor injects it on all requests
5. authMiddleware verifies JWT signature on every protected route
6. roleGuard checks req.user.role against the route's required permissions
```

**Role Permissions Matrix:**

| Action | Admin | Staff |
|---|---|---|
| View Dashboard & Analytics | ✅ | ✅ |
| View Products / Categories / Suppliers | ✅ | ✅ |
| Create Products / Categories / Suppliers | ✅ | ✅ |
| Update Products / Categories / Suppliers | ✅ | ✅ |
| **Delete** Products / Categories / Suppliers | ✅ | ❌ |
| Record Stock Movements (IN / OUT) | ✅ | ✅ |
| View Stock Movement History | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Import CSV | ✅ | ✅ |

---

## 🔍 Search, Filtering & Pagination

All filtering and pagination logic runs **server-side** and is executed via MongoDB queries — no full-collection fetching occurs on the backend.

**Query Parameters supported on `GET /api/products`:**

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Partial match on `name` or `sku` (case-insensitive regex) |
| `category` | ObjectId | Filter by category ID |
| `supplier` | ObjectId | Filter by supplier ID |
| `status` | string | `in_stock` / `low_stock` / `out_of_stock` |
| `sortBy` | string | Field to sort: `name`, `sku`, `price`, `stockQuantity`, `createdAt` |
| `order` | string | `asc` or `desc` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page: 5, 10, 20, 50 (default: 10) |

The frontend applies a **300ms debounce** to the search input to prevent excessive API requests while typing.

---

## 📦 Stock Management Workflow

Stock IN and Stock OUT operations are performed atomically using **MongoDB session transactions**, ensuring that the `StockMovement` document creation and the `Product.stockQuantity` increment/decrement always succeed or fail together — preventing data inconsistency.

```
User submits Stock OUT request (quantity: 50)
              │
              ▼
  authMiddleware + Joi validation
              │
              ▼
  Fetch current product.stockQuantity
              │
    stockQuantity >= 50?
     /                \
   YES                 NO
    │                   │
    ▼                   ▼
Start MongoDB       HTTP 400 Bad Request
Transaction         "Insufficient stock"
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

| Status | Condition |
|---|---|
| `in_stock` | `stockQuantity > 10` |
| `low_stock` | `1 ≤ stockQuantity ≤ 10` |
| `out_of_stock` | `stockQuantity === 0` |

---

## 📊 Dashboard Features

The analytics dashboard presents a real-time summary of the entire inventory state:

**KPI Metric Cards (8 total):**

| Metric | Description |
|---|---|
| 📦 Total Products | Count of all products in the catalog |
| 🗂️ Total Categories | Count of product categories |
| 🏭 Total Suppliers | Count of registered suppliers |
| 💰 Total Inventory Value | Sum of `price × stockQuantity` for all products (in PKR) |
| 📊 Total Stock Units | Aggregate stock quantity across all products |
| ⚠️ Low Stock Alerts | Products with `1 ≤ stockQuantity ≤ 10` |
| 🚫 Out of Stock | Products with `stockQuantity === 0` |
| 🔄 Today's Movements | Stock movements recorded in the current calendar day |

**Visual Charts:**

1. **30-Day Stock Movement Bar Chart** — Displays daily Stock IN vs Stock OUT volumes over the past 30 days, built with Recharts `<BarChart>`.
2. **Category Valuation Pie Chart** — Breaks down total inventory value by product category, built with Recharts `<PieChart>`.

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

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Then populate the values:

```env
DATABASE_URL="YOUR_MONGODB_CONNECTION_STRING"
PORT=3000
NODE_ENV=development
JWT_SECRET="YOUR_SECRET_KEY_MIN_32_CHARS"
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Environment Variables Reference:**

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | MongoDB Atlas connection string |
| `PORT` | ✅ | Express server port (default: `3000`) |
| `NODE_ENV` | ✅ | `development` or `production` |
| `JWT_SECRET` | ✅ | Secret key for JWT signing (keep private) |
| `JWT_EXPIRES_IN` | ✅ | Token expiry duration (e.g., `7d`, `24h`) |
| `CLIENT_URL` | ✅ | Frontend origin for CORS allowlist |

---

### Step 3 — Backend Setup

```bash
# From the backend/ directory
npm install

# Seed the database with demo data
npm run seed

# Start the development server
npm run dev
```

The backend API will be available at `http://localhost:3000`.  
Interactive Swagger documentation: `http://localhost:3000/api-docs`.

---

### Step 4 — Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

---

### Step 5 — Database Seeding

The seed script (`npm run seed`) populates the database with:

| Entity | Count | Details |
|---|---|---|
| Users | 2 | Admin + Staff with pre-hashed passwords |
| Categories | 3 | Sample product categories |
| Suppliers | 3 | Sample supplier records |
| Products | 20 | Varied stock levels (in-stock, low, out-of-stock) |
| Stock Movements | Multiple | Historical movements over the past 30 days |

---

## 🔗 Local URLs Quick Reference

| Service | URL |
|---|---|
| **Frontend Application** | `http://localhost:5173` |
| **Backend REST API** | `http://localhost:3000/api` |
| **Swagger / OpenAPI Docs** | `http://localhost:3000/api-docs` |
| **Postman Collection** | `./postman/ProductInventory.postman_collection.json` |

---

## 🔑 Demo Credentials

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Admin** | `admin@inventory.com` | `admin123` | Full access — Create, Read, Update, Delete |
| **Staff** | `staff@inventory.com` | `staff123` | Create, Read, Update, Stock Movements (no Delete) |

> The login screen includes **Demo Credentials** autofill buttons for one-click access.

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Register a new user |
| `POST` | `/api/auth/login` | None | Login and receive a JWT |
| `GET` | `/api/auth/me` | Bearer | Get the authenticated user's profile |

### Products

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/products` | Bearer | All | List products with search, filter, sort, paginate |
| `GET` | `/api/products/:id` | Bearer | All | Get a single product by ID |
| `POST` | `/api/products` | Bearer | All | Create a new product |
| `PUT` | `/api/products/:id` | Bearer | All | Update a product |
| `DELETE` | `/api/products/:id` | Bearer | **Admin** | Delete a product |
| `GET` | `/api/products/export/csv` | Bearer | All | Export filtered products as CSV |
| `POST` | `/api/products/import/csv` | Bearer | All | Bulk import products from CSV |

### Categories

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/categories` | Bearer | All | List all categories |
| `GET` | `/api/categories/:id` | Bearer | All | Get a category by ID |
| `POST` | `/api/categories` | Bearer | All | Create a new category |
| `PUT` | `/api/categories/:id` | Bearer | All | Update a category |
| `DELETE` | `/api/categories/:id` | Bearer | **Admin** | Delete a category (blocked if products are assigned) |

### Suppliers

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/suppliers` | Bearer | All | List all suppliers |
| `GET` | `/api/suppliers/:id` | Bearer | All | Get a supplier by ID |
| `POST` | `/api/suppliers` | Bearer | All | Create a new supplier |
| `PUT` | `/api/suppliers/:id` | Bearer | All | Update a supplier |
| `DELETE` | `/api/suppliers/:id` | Bearer | **Admin** | Delete a supplier |

### Stock Movements

| Method | Endpoint | Auth | Role | Description |
|---|---|---|---|---|
| `GET` | `/api/stock-movements` | Bearer | All | List movements with filter by type/date/product |
| `POST` | `/api/stock-movements` | Bearer | All | Record a new Stock IN or Stock OUT |

### Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/stats` | Bearer | Fetch all 8 KPI metrics |
| `GET` | `/api/dashboard/chart-data` | Bearer | Fetch 30-day movement chart data + category pie data |

---

## 🧪 Testing

The backend includes a Jest + Supertest integration test suite. Tests run against a dedicated test environment and verify real HTTP request/response cycles.

**Running Tests:**

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
| **Stock Movement API** | Atomic balance updates, insufficient stock rejection (`HTTP 400`), movement type filtering, date range filtering |

---

## 🛡️ Security Features

| Feature | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with salted rounds — plaintext passwords never stored |
| **Stateless Auth** | JWT tokens with configurable expiry — no server-side sessions |
| **CORS Protection** | Requests allowed only from the configured `CLIENT_URL` origin |
| **Role-Based Guards** | Middleware enforces Admin/Staff permissions at the route level |
| **Input Sanitization** | Joi schemas validate and strip unexpected fields from all request bodies |
| **Cascade Delete Guard** | Categories with linked products cannot be deleted, preventing orphaned references |
| **Transaction Integrity** | Stock movement + quantity update wrapped in MongoDB session transactions |

---

## ✅ Validation Rules

All validation is enforced server-side using **Joi schemas** before any database operation is attempted.

| Resource | Validated Fields |
|---|---|
| **User Registration** | `name` (required), `email` (valid format, unique), `password` (min 6 chars), `role` (enum) |
| **Product** | `name` (required), `sku` (required, unique), `price` (number, ≥ 0), `stockQuantity` (integer, ≥ 0), `category` (valid ObjectId), `supplier` (valid ObjectId) |
| **Category** | `name` (required, unique) |
| **Supplier** | `name` (required), `email` (valid format, optional) |
| **Stock Movement** | `product` (valid ObjectId), `type` (enum: `in`/`out`), `quantity` (integer, ≥ 1) |
| **Query Parameters** | `page`, `limit`, `sortBy`, `order`, `status` all validated against allowed values |

---

## ⚠️ Error Handling

The API returns consistent, structured JSON error responses across all routes:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": ["Detailed validation errors if applicable"]
}
```

| HTTP Status | Scenario |
|---|---|
| `400 Bad Request` | Joi validation failure, insufficient stock for OUT operation, duplicate SKU/email |
| `401 Unauthorized` | Missing or invalid JWT token |
| `403 Forbidden` | Valid token but insufficient role permissions (e.g., Staff attempting deletion) |
| `404 Not Found` | Requested resource does not exist |
| `409 Conflict` | Duplicate unique field violation (SKU, email, category name) |
| `500 Internal Server Error` | Unexpected server-side exception |

---

## 📋 Business Rules

1. **SKU Uniqueness** — Every product must have a unique Stock Keeping Unit identifier.
2. **Oversell Prevention** — A Stock OUT operation that would result in negative stock is rejected before any database write occurs.
3. **Cascade Protection** — A category cannot be deleted while any products are assigned to it.
4. **Atomic Transactions** — Stock movements and product quantity updates are committed or rolled back together via MongoDB sessions.
5. **Low Stock Threshold** — Products with `stockQuantity` between 1 and 10 (inclusive) are flagged as Low Stock on the dashboard.
6. **Admin-Only Deletion** — Only users with the `admin` role may delete products, categories, or suppliers.
7. **Demo Credential Autofill** — The login page exposes quick-fill buttons for both demo roles to simplify evaluation.

---


| View | Description |
|---|---|
| **Login Page** | Email/password form with Admin and Staff demo credential autofill buttons |
| **Dashboard** | 8 KPI metric cards, 30-day bar chart, and category valuation pie chart |
| **Products List** | Paginated table with debounced search, filter dropdowns, sort controls, and per-row actions |
| **Product Detail** | Full product view with stock status badge and movement history |
| **Add / Edit Product** | Form with SKU, price, stock, category, and supplier fields |
| **Stock Movement Log** | Filtered audit table showing IN/OUT history per product |
| **Categories & Suppliers** | Respective CRUD management pages |
| **CSV Import** | Drag-and-drop file upload with row validation summary |
| **Swagger UI** | Interactive `/api-docs` endpoint explorer |

---






## 👤 Author

**Muhammad Shah Nawaz**

[![GitHub](https://img.shields.io/badge/GitHub-mshahnawaz1202-181717?style=flat-square&logo=github)](https://github.com/mshahnawaz1202)

> Built as a full-stack portfolio project demonstrating MERN stack proficiency, REST API design, role-based security, transactional database operations, data visualization, and automated testing.

---

<div align="center">

⭐ If you find this project useful, please consider giving it a star on GitHub!

</div>
