# 🍳 Recipe AI Backend

An AI-powered Recipe Recommendation Backend built using **FastAPI**, **Elasticsearch**, **Hybrid Search (BM25 + Vector Search)**, **RAG (Retrieval-Augmented Generation)**, **Google Gemini**, **Groq**, and **BGE Embeddings**.

The backend retrieves relevant recipes using Hybrid Search and generates intelligent cooking recommendations using Large Language Models.

---

# 🚀 Features

## 🔍 Intelligent Search

- BM25 Keyword Search
- Semantic Vector Search
- Hybrid Search (BM25 + Dense Vectors)
- Multi-field Search
- Fuzzy Search
- Search Highlighting
- Search-as-you-Type Autocomplete

---

## 🤖 AI Features

- Retrieval-Augmented Generation (RAG)
- Local BGE Embeddings
- Google Gemini Integration
- Groq Fallback LLM
- Prompt Engineering
- Semantic Recipe Retrieval

---

## 🍽 Recipe Filters

- Cuisine Filter
- Minimum Rating Filter
- Adjustable Search Size

---

## ⚡ Backend

- FastAPI REST API
- Elasticsearch Cloud
- CSV Dataset Ingestion
- Dense Vector Indexing
- Automatic Embedding Generation

---

# 🏗 Architecture

> *(Insert your architecture diagram here)*

Example Flow:

```
User Query
      │
      ▼
Hybrid Search
(BM25 + Vector Search)
      │
      ▼
Top Matching Recipes
      │
      ▼
Prompt Builder
      │
      ▼
Gemini
      │
      ▼
Groq (Fallback)
      │
      ▼
AI Recommendation
```

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Backend | FastAPI |
| Search Engine | Elasticsearch Cloud |
| Vector Search | Dense Vectors |
| Embeddings | BAAI/bge-small-en-v1.5 |
| AI | Google Gemini |
| Fallback AI | Groq |
| Dataset | AllRecipes CSV |
| Language | Python 3.11 |

---

# 📁 Project Structure

```
backend/

│── app/
│   ├── config.py
│   ├── elastic.py
│   ├── embedding.py
│   ├── gemini.py
│   ├── groq.py
│   ├── hybrid_search.py
│   ├── ingest.py
│   ├── llm.py
│   ├── rag.py
│   ├── search.py
│   ├── vector_search.py
│   └── main.py
│
├── data/
│   └── recipes.csv
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd backend
```

---

## Create Virtual Environment

```bash
python -m venv .venv
```

Activate it

Windows

```bash
.venv\Scripts\activate
```

Linux / Mac

```bash
source .venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
ELASTIC_URL=YOUR_ELASTIC_URL

ELASTIC_API_KEY=YOUR_ELASTIC_API_KEY

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

# 📥 Dataset Ingestion

Delete existing index

```
DELETE /delete_index
```

Create index

```
GET /create_index
```

Ingest recipes

```
GET /ingest
```

---

# ▶ Running the Backend

```bash
uvicorn app.main:app --reload
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

# 📡 API Endpoints

## Root

```
GET /
```

Returns backend status.

---

## Hybrid Search

```
GET /hybrid_search
```

Example

```
/hybrid_search?query=chicken garlic butter
```

---

## BM25 Search

```
GET /search
```

Supports

- query
- cuisine
- rating
- size

Example

```
/search?query=chicken&cuisine=Asian&rating=4.5
```

---

## Vector Search

```
GET /vector_search
```

Example

```
/vector_search?query=healthy breakfast
```

---

## RAG

```
GET /rag
```

Example

```
/rag?query=I have chicken garlic butter
```

Returns

- AI Recommendation
- Source Recipes
- Provider Used
- Retrieved Recipes

---

# 🔍 Search Pipeline

```
User Query
      │
      ▼
Hybrid Search
(BM25 + Dense Vector)
      │
      ▼
Top Matching Recipes
      │
      ▼
Prompt Builder
      │
      ▼
Gemini
      │
      ▼
Groq (Fallback)
      │
      ▼
Final AI Recommendation
```

---

# 🧠 Embeddings

This project uses

```
BAAI/bge-small-en-v1.5
```

Each recipe is converted into a **384-dimensional dense vector** and stored inside Elasticsearch.

Embedded Fields

- Recipe Name
- Cuisine
- Ingredients
- Directions
- Nutrition

---

# 📊 Hybrid Search

The backend combines

- BM25 Keyword Search
- Semantic Vector Search

using Elasticsearch's Hybrid Retrieval capabilities.

Benefits

- Better relevance
- Semantic understanding
- Exact keyword matching
- Improved ranking

---

# 🤖 RAG Pipeline

1. User submits a cooking query.
2. Hybrid Search retrieves relevant recipes.
3. Retrieved recipes are converted into an LLM prompt.
4. Gemini generates the recommendation.
5. Groq automatically handles the request if Gemini is unavailable.

---

# 🎯 Future Improvements

- Recipe Image Search
- Personalized Recommendations
- User Authentication
- Favorites & History
- Recipe Ratings
- Voice Search
- Streaming AI Responses
- Docker Deployment
- Redis Caching

---

# 👨‍💻 Author

**Suryansh Sharma**

Computer & Data Science Undergraduate

AI • Machine Learning • Search Systems • Backend Engineering

---

# ⭐ Project Highlights

- FastAPI Backend
- Elasticsearch Cloud
- Hybrid Search
- Dense Vector Search
- Retrieval-Augmented Generation (RAG)
- Local BGE Embeddings
- Google Gemini Integration
- Groq LLM Fallback
- Search-as-you-Type
- Semantic Recipe Recommendation