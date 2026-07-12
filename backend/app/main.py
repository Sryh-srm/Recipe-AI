from fastapi import FastAPI
from app.gemini import generate_text
from app.elastic import check_connection
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

