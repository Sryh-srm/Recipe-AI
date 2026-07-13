                    User
                      │
                      ▼
                FastAPI Backend
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
   BM25 Search               Vector Search
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Hybrid Search
                      │
                      ▼
             Top Matching Recipes
                      │
                      ▼
            Gemini (Primary LLM)
                      │
          (Fails automatically)
                      ▼
            Groq (Fallback LLM)
                      │
                      ▼
            AI Recommendation