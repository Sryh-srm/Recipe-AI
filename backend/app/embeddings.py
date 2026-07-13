# from google import genai
# from app.config import GEMINI_API_KEY

# client = genai.Client(api_key=GEMINI_API_KEY)


# def get_embedding(text: str):

#     response = client.models.embed_content(
#         model="models/gemini-embedding-001",
#         contents=text
#     )

#     return response.embeddings[0].values

from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-small-en-v1.5")


def get_embedding(text: str):

    return model.encode(text).tolist()