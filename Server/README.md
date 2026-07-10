#  AI Research Assistant - Backend

A scalable Node.js backend for an AI-powered Research Assistant that automatically gathers information from the web and books, generates structured research reports using Google Gemini AI, and stores everything securely with Firebase Authentication and MongoDB.

---

# Features

- 🔐 Firebase Authentication
  - Email & Password Login
  - Google Login Ready
  - Firebase Admin Token Verification

- 👤 User Management
  - Sync Firebase Users to MongoDB
  - View Profile
  - Update Profile
  - Delete Account

- 🤖 AI Research Pipeline
  - Web Search (Serper API)
  - Google Books Search
  - AI Research Generation (Gemini 2.5 Flash)
  - Automatic Report Generation
  - Keywords Extraction
  - Executive Summary
  - Citations Generation

- 📚 Research Management
  - Create Research
  - View All Research
  - Get Research by ID
  - Delete Research
  - Research Statistics

- 🗄 MongoDB Database
  - User Collection
  - Research Collection

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Authentication
- Firebase Admin SDK
- Google Gemini API
- Serper API
- Google Books API

---

# Project Structure

```
Server
│
├── config
│   ├── db.js
│   └── firebaseAdmin.js
│
├── controllers
│   ├── authController.js
│   └── researchController.js
│
├── middleware
│   ├── verifyFirebaseToken.js
│   └── loadUser.js
│
├── models
│   ├── User.js
│   └── Research.js
│
├── routes
│   ├── authRoutes.js
│   └── researchRoutes.js
│
├── services
│   ├── googleBooksService.js
│   ├── serperService.js
│   ├── llmService.js
│   ├── researchAgent.js
│   └── researchPipeline.js
│
├── prompts
│   └── prompt.js
│
├── utils
│
├── server.js
└── package.json
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Research-Assistant.git
```

Go to backend

```bash
cd AI-Research-Assistant/Server
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

SERPER_API_KEY=YOUR_SERPER_API_KEY

GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY
```

---

# Firebase Setup

Create

```
Server/keys/serviceAccountKey.json
```

Download your Firebase Admin SDK JSON and place it inside the **keys** folder.

> Do **NOT** commit this file to GitHub.

---

# Run the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server

```
http://localhost:5000
```

---

# Authentication Flow

```
Firebase Login
        │
        ▼
Firebase ID Token
        │
        ▼
POST /api/auth/sync-user
        │
        ▼
MongoDB User Created
        │
        ▼
Protected APIs
```

---

# API Endpoints

## Authentication

### Sync User

```
POST /api/auth/sync-user
```

### Get Profile

```
GET /api/auth/profile
```

### Update Profile

```
PUT /api/auth/profile
```

### Delete Profile

```
DELETE /api/auth/profile
```

---

## Research

### Create Research

```
POST /api/research
```

### Get All Research

```
GET /api/research
```

### Get Research By ID

```
GET /api/research/:id
```

### Delete Research

```
DELETE /api/research/:id
```

### Research Statistics

```
GET /api/research/stats
```

---

# AI Research Workflow

```
User Request
      │
      ▼
Serper Search
      │
      ▼
Google Books Search
      │
      ▼
Gemini 2.5 Flash
      │
      ▼
Generate

• Executive Summary
• Introduction
• Technologies
• Applications
• Advantages
• Challenges
• Future Scope
• Keywords
• Citations

      │
      ▼
Store in MongoDB
```

---

# Security

- Firebase Authentication
- Firebase Admin Token Verification
- Protected API Routes
- MongoDB User Isolation
- Environment Variables
- Service Account Ignored via `.gitignore`

---

# Future Improvements

- React Frontend
- Dashboard Analytics
- Research Search & Filters
- Pagination
- Export Research to PDF
- Research Bookmarks
- AI Chat with Research
- Multi-language Support

---

# Author

**Pavan Gollavilli**

B.Tech CSE (AI & ML)

AI & Full Stack Developer

GitHub: https://github.com/Pavan-Gollavilli

---

# License

This project is licensed under the MIT License.
