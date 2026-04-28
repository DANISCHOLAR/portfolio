# 💰 Expense Tracker - Full Stack Web Application

A modern full-stack expense tracking application built with **Next.js**, **Node.js/Express**, and **MongoDB**.

---

## 🎯 Project Overview

### Features
✅ **Add Expenses** - Record your daily expenses with category, amount, and description  
✅ **View All Expenses** - See a organized list of all your expenses  
✅ **Delete Expenses** - Remove expenses with one click  
✅ **Category Filtering** - Filter by Food, Transport, Entertainment, Shopping, or Other  
✅ **Statistics** - View total expenses and category breakdown  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  

---

## 🏗️ Project Architecture

```
expense-tracker/
├── backend/                    # Express.js API Server
│   ├── src/
│   │   ├── server.ts          # Main server file
│   │   ├── models/
│   │   │   └── Expense.ts     # MongoDB Expense model
│   │   └── routes/
│   │       └── expenses.ts    # API endpoints (CRUD)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env                   # Environment variables
│
└── frontend/                   # Next.js React App
    ├── app/
    │   ├── page.tsx           # Main expense tracker UI
    │   ├── layout.tsx         # Layout wrapper
    │   └── globals.css        # Tailwind styles
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    └── .env.local             # Frontend env variables
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` if not using local MongoDB
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   ```

3. **Start Backend Server** (development mode with auto-reload)
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:5000`
   - Health check: `http://localhost:5000/health`

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**
   - `.env.local` already configured for local development
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Start Frontend Application**
   ```bash
   npm run dev
   ```
   - App runs on `http://localhost:3000`

---

## 📡 API Endpoints

### Expenses Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get expense by ID |
| POST | `/api/expenses` | Create new expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/expenses/category/:category` | Get expenses by category |
| GET | `/api/stats/summary` | Get expense statistics |

### Example API Calls

**Create Expense**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "category": "Food",
    "amount": 25.50,
    "description": "Lunch at restaurant",
    "date": "2024-01-15"
  }'
```

**Get All Expenses**
```bash
curl http://localhost:5000/api/expenses
```

**Delete Expense**
```bash
curl -X DELETE http://localhost:5000/api/expenses/[EXPENSE_ID]
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js (REST API)
- **Database**: MongoDB with Mongoose ODM
- **Middleware**: CORS, Express JSON parser
- **Dev Tools**: TypeScript, ts-node, ESLint

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS + PostCSS
- **HTTP Client**: Axios
- **Language**: TypeScript
- **UI Features**: Responsive grid, gradient background, hover effects

---

## 📝 Data Model

### Expense Document
```json
{
  "_id": "ObjectId",
  "category": "Food|Transport|Entertainment|Shopping|Other",
  "amount": 25.50,
  "description": "Lunch at restaurant",
  "date": "2024-01-15T10:30:00.000Z",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎨 UI Components & Features

- **Form Section**: Add new expense with category dropdown, amount input, description
- **Expenses List**: Display expenses with category, description, date, and amount
- **Total Calculator**: Real-time total expenses calculation
- **Delete Button**: Quick remove functionality for each expense
- **Loading State**: Shows loading message while fetching data
- **Empty State**: Friendly message when no expenses exist
- **Responsive Layout**: 3-column grid on desktop, 1-column on mobile

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas, verify connection string and IP whitelist

### CORS Error
- Backend CORS is enabled for all origins: `cors()`
- Ensure frontend `NEXT_PUBLIC_API_URL` matches backend URL

### Port Already in Use
- Change `PORT` in backend `.env`
- Change Next.js port: `npm run dev -- -p 3001`

---

## 📦 Available Scripts

### Backend
```bash
npm run dev    # Start development server with auto-reload
npm run build  # Compile TypeScript
npm start      # Run compiled server
npm run lint   # Run ESLint
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm run lint   # Run Next.js linter
```

---

## 🔐 Security Notes

- Add authentication (JWT tokens) for production
- Validate all inputs on backend
- Use HTTPS in production
- Store sensitive data in `.env` files (never commit)
- Add rate limiting for API endpoints

---

## 🚀 Next Steps / Enhancements

- [ ] User authentication & authorization
- [ ] Monthly/yearly reports
- [ ] Budget limits per category
- [ ] Expense charts/graphs (Chart.js)
- [ ] Export to CSV/PDF
- [ ] Mobile app with React Native
- [ ] Dark mode toggle
- [ ] Multi-user support

---

## 📄 License

MIT License - Feel free to use this project for learning and personal use.

---

## 👨‍💻 Contributing

Feel free to fork, modify, and improve this project!

---

**Happy Tracking!** 💰
