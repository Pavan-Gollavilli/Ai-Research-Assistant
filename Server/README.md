# AI Research Assistant - Backend

A Multi-Agent AI Research Assistant backend built using **Node.js**, **Express.js**, **MongoDB**, and **Google Gemini**. The application performs automated research by collecting information from web search, Google Books, and AI-generated summaries, reports, and citations.

---

## Features

- Web Search using Serper API
- Book Search using Google Books API
- AI-powered Summary Generation using Google Gemini
- AI-powered Keyword Extraction
- AI-powered Research Report Generation
- Citation Generation
- MongoDB Database Integration
- RESTful APIs
- Modular Service Architecture
- Error Handling Middleware

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API
- Serper API
- Google Books API
- Axios
- Dotenv

---

## Project Structure

```
Server/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── researchController.js
│
├── middleware/
│   └── errorHandler.js
│
├── models/
│   └── Research.js
│
├── routes/
│   └── researchRoutes.js
│
├── services/
│   ├── serperService.js
│   ├── googleBooksService.js
│   ├── openAIService.js
│   ├── summaryService.js
│   ├── keywordService.js
│   ├── reportService.js
│   ├── citationService.js
│   └── researchPipeline.js
│
├── utils/
│   └── prompts.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Move to the backend directory

```bash
cd Server
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

DB_NAME=research_assistant

SERPER_API_KEY=your_serper_api_key

GOOGLE_BOOKS_API_KEY=your_google_books_api_key

GEMINI_API_KEY=your_gemini_api_key
```

---

## Start Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

Server will run at

```
http://localhost:5000
```

---

# API Endpoints

## Home

```
GET /
```

Response

```json
{
  "success": true,
  "message": "AI Research Assistant API"
}
```

---

## Health Check

```
GET /health
```

Response

```json
{
  "success": true,
  "status": "OK"
}
```

---

## Create Research

```
POST /api/research
```

Request Body

```json
{
  "title": "AI in Healthcare",
  "topic": "Artificial Intelligence in Healthcare"
}
```

---

## Get All Research

```
GET /api/research
```

---

## Get Research by ID

```
GET /api/research/:id
```

---

## Delete Research

```
DELETE /api/research/:id
```

---

# Backend Workflow

```
Client
    │
    ▼
Express Routes
    │
    ▼
Research Controller
    │
    ▼
Research Pipeline
    │
    ├──────────────► Serper API
    │
    ├──────────────► Google Books API
    │
    ├──────────────► Gemini Summary Agent
    │
    ├──────────────► Gemini Keyword Agent
    │
    ├──────────────► Gemini Report Agent
    │
    └──────────────► Citation Agent
    │
    ▼
MongoDB
    │
    ▼
Response
```

---

# Multi-Agent Workflow

```
User Query

↓

Research Controller

↓

Research Pipeline

↓

Web Search Agent

↓

Book Search Agent

↓

Summary Agent

↓

Keyword Agent

↓

Report Agent

↓

Citation Agent

↓

MongoDB

↓

REST API Response
```

---

# Database Schema

Research

```
title
topic
status
summary
report
keywords
articles
books
sources
searchMetadata
generatedBy
createdAt
updatedAt
```

---

# Services

## Serper Service

- Search latest web articles
- Return article metadata

---

## Google Books Service

- Search books
- Return authors, publisher, description, thumbnail

---

## Gemini Service

- Generate summary
- Extract keywords
- Generate professional research report

---

## Citation Service

Generate formatted citations for:

- Articles
- Books
- Websites

---

# Future Improvements

- User Authentication (JWT)
- PDF Upload & Analysis
- Research Export (PDF)
- Research History
- User Dashboard
- AI Chat with Research
- RAG using Vector Database
- Multi-user Support
- Docker Deployment
- CI/CD Pipeline

---

# Dependencies

```
express
mongoose
cors
dotenv
axios
@google/genai
```

---

# Author

**Pavan Gollavilli**

AI & Machine Learning Student

MERN Stack Developer

Generative AI Enthusiast