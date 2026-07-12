import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ELASTIC_ENDPOINT=os.getenv('ELASTIC_ENDPOINT')
ELASTIC_API_KEY=os.getenv('ELASTIC_API_KEY')