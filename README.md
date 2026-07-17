# 🍳 Recipe-AI

An AI-powered recipe discovery and recommendation system that combines **Retrieval-Augmented Generation (RAG)**, **Hybrid Search**, and **Large Language Models** to deliver context-aware recipe recommendations based on user ingredients and natural language queries.

The application retrieves relevant recipes from Elasticsearch using hybrid search and uses LLMs to generate personalized cooking suggestions grounded in the retrieved data.

---

## ✨ Features

- 🤖 AI-powered recipe recommendations using RAG
- 🔍 Hybrid Search (Keyword + Semantic Retrieval)
- 💬 Natural language recipe search
- 🥘 Ingredient-based recipe discovery
- ⚡ Dual LLM architecture
  - Google Gemini (Primary)
  - Groq Llama 3.3 (Fallback)
- 🔄 Automatic fallback when primary model is unavailable
- 🚀 FastAPI REST Backend
- 🎨 Modern Next.js Frontend
- ☁️ Elasticsearch vector & keyword search

---


# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- JavaScript

## Backend

- FastAPI
- Python
- Pydantic
- Uvicorn

## AI

- Google Gemini
- Groq
- Retrieval-Augmented Generation (RAG)

## Search

- Elasticsearch
- Hybrid Search
- Semantic Search
- Keyword Search

## Data

- Pandas
- CSV Dataset
- Recipe Dataset (1090+ Recipes)



---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/recipe-ai.git

cd recipe-ai
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate virtual environment

Windows

```bash
.venv\Scripts\activate
```

Linux / macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env`

```env
GEMINI_API_KEY=your_key
GROQ_API_KEY=your_key

ELASTIC_URL=...
ELASTIC_API_KEY=...
ELASTIC_INDEX=recipes
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# 🔍 Search Pipeline

```
User Query
      │
      ▼
FastAPI
      │
      ▼
Elasticsearch
(Hybrid Search)
      │
      ▼
Top Relevant Recipes
      │
      ▼
Prompt Construction
      │
      ▼
Gemini
      │
      ▼
Fallback to Groq (if needed)
      │
      ▼
AI Generated Response
```

---



# 🔮 Future Improvements

- Voice-based recipe search
- Nutrition analysis
- Meal planning
- Shopping list generation
- Recipe image generation
- User authentication
- Recipe bookmarking
- Personalized recommendations
- Local LLM support using Ollama

---

# 📄 License

This project is intended for educational and learning purposes.

---

# 👨‍💻 Author

**Suryansh Sharma**
