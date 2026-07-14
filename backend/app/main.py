from fastapi import FastAPI

from app.gemini import generate_with_gemini
from app.elastic import check_connection, es
from app.ingest import create_index, ingest_csv
from app.search import search_recipes
from app.autocomplete import autocomplete
from app.rag import build_prompt
from app.groq import generate_with_groq
from app.vectorsearch import vector_search
from app.hybridsearch import hybrid_search
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Recipe AI API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Backend Running 🚀"
    }


@app.get("/generate")
def generate(prompt: str):
    return {
        "response": generate_with_gemini(prompt)
    }
@app.get('/elastic')
def elastic():
   
    return check_connection()



@app.get('/create_index')
def index():
    return {
        'message':create_index()
    }



@app.get('/ingest')
def ingest():
    return {
        'message':ingest_csv()
    }





@app.get("/count")
def count():
    return es.count(index="recipes")
from app.search import search_recipes




@app.get("/search")
def search(
    query: str,
    cuisine: str | None = None,
    rating: float | None = None,
    size: int = 5
):
    return search_recipes(
        query=query,
        cuisine=cuisine,
        rating=rating,
        size=size
    )





@app.delete("/delete_index")
def delete_index():
    es.indices.delete(index="recipes", ignore_unavailable=True)
    return {"message": "Recipes index deleted successfully."}

@app.get("/autocomplete")
def auto(query: str):
    return autocomplete(query)

@app.get("/rag")
def rag(query: str):
    return  build_prompt(query)
    

 
@app.get("/groq")
def groq_test():
    return {
        "response": generate_with_groq("Say hello!")
    }
@app.get("/vector_search")
def vector(query: str, size: int = 5):
    return vector_search(query, size)

@app.get("/hybrid_search")
def hybrid(
    query: str,
    size: int = 5
):
    return hybrid_search(query, size)
