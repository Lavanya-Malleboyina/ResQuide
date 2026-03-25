# 🛡️ ResQGuide — Building Safety Assessment System

## Project Structure

```
resqguide/
├── resqguide-backend/    ← Node.js + Express + MongoDB
└── resqguide-frontend/   ← React + Tailwind CSS
```

---

## ⚙️ Backend Setup

```bash
cd resqguide-backend
npm install
npm run dev
```

- Runs on: http://localhost:5000
- Database: MongoDB at mongodb://127.0.0.1:27017/resqguide
- Make sure MongoDB is running locally before starting

### Backend .env (already included)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resqguide
JWT_SECRET=resqguide_super_secret_key_change_this_in_production
```

---

## 🌐 Frontend Setup

```bash
cd resqguide-frontend
npm install
npm start
```

- Runs on: http://localhost:3000
- Talks to backend at: http://localhost:5000

---

## 👤 Default Roles

Register a user with role **admin** to access the Admin Dashboard.
Register a user with role **user** to access the User Dashboard.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/building-types | Get all building types |
| POST | /api/building-types | Add building type (admin) |
| GET | /api/questions?buildingType=residential | Get questions by type |
| POST | /api/questions | Add question (admin) |
| POST | /api/risk/calculate | Calculate risk score |
| GET | /api/safeplaces | Get safe places |
| POST | /api/safeplaces | Add safe place (admin) |
| GET | /api/alerts | Get disaster alerts |
| POST | /api/alerts | Add alert (admin) |
| GET | /api/recommendations/:riskLevel | Get recommendations |

---

## 🗄️ Database

MongoDB database name: **resqguide**

Collections created automatically:
- users
- buildingtypes
- questions
- responses
- riskassessments
- safeplaces
- disasteralerts
- safetyrecommendations
