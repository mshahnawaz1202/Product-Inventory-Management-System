<div align="center">

# StockFlow — Product Inventory Management System

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.7-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![JSON Web Tokens](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

<p align="center">
  A production-grade, full-stack enterprise product inventory management system built on the MERN stack. Features role-based access control (Admin & Staff), atomic inventory stock movements via MongoDB sessions, bulk CSV import/export, interactive Recharts telemetry charts, PKR currency formatting, and automated API testing.
</p>

</div>

---

## Tech Stack & Badges

### Frontend Ecosystem
- ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) **React 18**: UI component architecture with Context API state management
- ![Vite](https://img.shields.io/badge/Vite_6.1-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite**: Lightning-fast frontend build tooling and HMR dev server
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) **Tailwind CSS v4**: Utility-first CSS styling framework
- ![Recharts](https://img.shields.io/badge/Recharts_2.15-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white) **Recharts**: Responsive data visualization (30-day stock movement bar chart & category valuation pie chart)
- ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-04750-F59E0B?style=flat-square&logo=feather&logoColor=white) **Lucide Icons**: Modern SVG icon collection
- ![Axios](https://img.shields.io/badge/Axios_1.7-5A29E4?style=flat-square&logo=axios&logoColor=white) **Axios**: HTTP client with request/response Bearer token interceptors

### Backend & Database Ecosystem
- ![Node.js](https://img.shields.io/badge/Node.js_18-339933?style=flat-square&logo=nodedotjs&logoColor=white) **Node.js**: JavaScript runtime environment
- ![Express.js](https://img.shields.io/badge/Express.js_4-000000?style=flat-square&logo=express&logoColor=white) **Express.js**: Fast web framework for REST API endpoints
- ![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) **MongoDB Atlas**: Cloud NoSQL document database
- ![Mongoose](https://img.shields.io/badge/Mongoose_8.5-880000?style=flat-square&logo=mongoose&logoColor=white) **Mongoose ODM**: Schema validation and transactional ODM
- ![JSON Web Tokens](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) **JWT & bcryptjs**: Authentication and salted password hashing
- ![Joi Validator](https://img.shields.io/badge/Joi_Validator-17.13-339933?style=flat-square) **Joi**: Server-side request body and query parameter validator
- ![Jest](https://img.shields.io/badge/Jest_29.7-C21325?style=flat-square&logo=jest&logoColor=white) **Jest & Supertest**: Automated integration & API test runner
- ![Swagger](https://img.shields.io/badge/Swagger_UI-85EA2D?style=flat-square&logo=swagger&logoColor=black) **Swagger UI**: Interactive OpenAPI documentation

---

## How to Run Locally

Follow these step-by-step instructions to get the application running on your local machine (`http://localhost`).

### Prerequisites
- **Node.js**: Version 18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: Version 9.0.0 or higher
- **Git**: Installed on your system

---

### Step 1: Clone the Repository
Open your terminal or command prompt and clone the repository:

```bash
git clone https://github.com/mshahnawaz1202/Product-Inventory-Management-System.git
cd Product-Inventory-Management-System
```

---

### Step 2: Set Up and Run the Backend API

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install Node modules**:
   ```bash
   npm install
   ```

3. **Verify Environment Variables (`.env`)**:
   The backend environment file is located at `backend/.env`. It is pre-configured with the MongoDB database string:
   ```env
   DATABASE_URL="mongodb+srv://shah:WzdcQZcYfzjKyii9@backend.7q3ilbf.mongodb.net/product_inventory"
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=inventory_jwt_secret_key_2024_super_secure
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   ```

4. **Seed the Database with Sample Data**:
   Populate MongoDB with 2 users (Admin & Staff), 3 categories, 3 suppliers, 20 products, and initial stock movements:
   ```bash
   npm run seed
   ```

5. **Start the Backend Server**:
   ```bash
   npm run dev
   ```
   - **Backend API URL**: `http://localhost:3000`
   - **Swagger OpenAPI Docs**: `http://localhost:3000/api-docs`

---

### Step 3: Set Up and Run the Frontend Application

1. **Open a new terminal window** and navigate to the `frontend` folder:
   ```bash
   cd Product-Inventory-Management-System/frontend
   ```

2. **Install Node modules**:
   ```bash
   npm install
   ```

3. **Start the Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   - **Frontend App URL**: `http://localhost:5173` (or `http://localhost:5174` if port 5173 is in use)

---

### Step 4: Login to the Application

Open your browser and navigate to **`http://localhost:5173/login`** (or `http://localhost:5174/login`).

Use the pre-configured demo credentials or click the **Demo Credentials** autofill buttons on the login screen:

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Admin** | `admin@inventory.com` | `admin123` | Full access (Create, Read, Update, Delete) |
| **Staff** | `staff@inventory.com` | `staff123` | Restricted access (Create, Read, Update, Stock Movements) |

---

## Local URLs Quick Reference

| Component | Local URL |
|---|---|
| **Web Application (Frontend)** | `http://localhost:5173` or `http://localhost:5174` |
| **Backend REST API** | `http://localhost:3000/api` |
| **Swagger Interactive API Documentation** | `http://localhost:3000/api-docs` |
| **Postman Collection** | Included in `./postman/ProductInventory.postman_collection.json` |

---

## Key Features Overview

### 1. Dashboard & Telemetry
- **8 Metric Cards**: Total Products, Categories, Suppliers, Total Inventory Value (PKR), Total Stock Units, Low Stock Alerts (< 10), Out of Stock (0), and Today's Stock Movements.
- **Visual Analytics**: Interactive Recharts bar chart tracking 30-day stock movement history (IN vs OUT) and category valuation pie chart.

### 2. Products Catalog Management
- **Full CRUD**: Create, view details, update, and delete products with SKU, price (PKR), stock quantity, category, and supplier.
- **Search & Filters**: Real-time debounced text search (by name or SKU), multi-select category/supplier dropdowns, and stock status filters (`in_stock`, `low_stock`, `out_of_stock`).
- **Sorting & Pagination**: Server-side sorting by name, SKU, price, stock, or date with customizable items per page (5, 10, 20, 50).

### 3. Stock Movement Audit Log
- **Atomic Balance Updates**: Stock IN (+) increases inventory and Stock OUT (-) decreases inventory using MongoDB transactional sessions.
- **Validation Controls**: Attempting a Stock OUT larger than the current stock is automatically rejected with an `HTTP 400 Bad Request`.

### 4. CSV Import & Export
- **CSV Export**: Exports the currently filtered products catalog directly to a `.csv` file download.
- **Bulk CSV Import**: Drag-and-drop CSV upload with row-by-row validation, duplicate SKU detection, and summary log reporting.

---

## Running Automated Tests

To execute the backend Jest test suite:

```bash
cd backend
npm test
```

To run test coverage report:
```bash
npm run test:coverage
```

Test suites verify:
- **Auth API**: User registration, duplicate email handling, login validation, token authorization.
- **Product API**: SKU uniqueness, negative price rejection, search/filter queries, role-restricted deletion.
- **Category API**: Category creation, duplicate name check, cascade-delete restriction when products are assigned.
- **Stock Movement API**: Transactional stock level updates, insufficient stock rejection, type and date range filtering.

---

## License

This project is open source and available under the **MIT License**.
