from app.elastic import es
import pandas as pd
from app.embeddings import get_embedding
INDEX_NAME = "recipes"


def create_index():
    if es.indices.exists(index=INDEX_NAME):
        return "Index already exists."

    mapping = {
        "mappings": {
            "properties": {
                "recipe_name": {"type": "search_as_you_type"},
                "ingredients": {"type": "text"},
                "directions": {"type": "text"},
                "nutrition": {"type": "text"},
                "cuisine_path": {"type": "keyword"},
                "prep_time": {"type": "keyword"},
                "cook_time": {"type": "keyword"},
                "total_time": {"type": "keyword"},
                "servings": {"type": "keyword"},
                "rating": {"type": "float"},
                "url": {"type": "keyword"},
                "img_src": {"type": "keyword"},
                "embedding": {
    "type": "dense_vector",
    "dims": 384,
    "index": True,
    "similarity": "cosine"
}
            }
        }
    }

    es.indices.create(index=INDEX_NAME, body=mapping)

    return "Recipes index created successfully!"

def ingest_csv():

    df = pd.read_csv("data/recipes.csv")

    if "Unnamed: 0" in df.columns:
        df = df.drop(columns=["Unnamed: 0"])

    

    count = 0

    for _, row in df.iterrows():

        doc = row.fillna("").to_dict()

        # Text that will be embedded
        text = f"""
This is a cooking recipe.

Recipe Name: {doc['recipe_name']}

Cuisine: {doc['cuisine_path']}

Ingredients:
{doc['ingredients']}

Directions:
{doc['directions']}

Nutrition:
{doc['nutrition']}
"""

        # Generate embedding
        doc["embedding"] = get_embedding(text)

        es.index(
            index=INDEX_NAME,
            document=doc
        )

        count += 1

        print(f"Indexed {count}/10")

    return f"{count} recipes indexed successfully!"