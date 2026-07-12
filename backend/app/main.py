from fastapi import FastAPI
from app.gemini import generate_text

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