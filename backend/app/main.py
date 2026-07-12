from fastapi import FastAPI
from app.gemini import generate_text
from app.elastic import check_connection 
from app.ingest import create_index ,ingest_csv
app = FastAPI(
    title="Recipe AI API"
)


@app.get("/")
def root():
    return {
        "message": "Backend Running 🚀"
    }


@app.get("/generate")
def generate(prompt: str):
    return {
        "response": generate_text(prompt)
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




from app.elastic import es

@app.get("/count")
def count():
    return es.count(index="recipes")
from app.search import search_recipes




@app.get("/search")
def search(
    query: str,
    cuisine: str | None = None,
    size: int = 5
):
    return search_recipes(query, cuisine, size) 


@app.get("/sample")
def sample():
    result = es.search(
        index="recipes",
        query={
            "match": {
                "recipe_name": "BBQ"
            }
        }
    )

    return result["hits"]["hits"]



import pandas as pd

@app.get("/test")
def test():
    df = pd.read_csv("data/recipes.csv")

    return {
        "ingredients": df.iloc[778]["ingredients"]
    }
from app.elastic import es

@app.delete("/delete_index")
def delete_index():
    es.indices.delete(index="recipes", ignore_unavailable=True)
    return {"message": "Recipes index deleted successfully."}