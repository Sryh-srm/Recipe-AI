from app.elastic import es
import pandas as pd
INDEX_NAME = "recipes"


def create_index():
    if es.indices.exists(index=INDEX_NAME):
        return "Index already exists."

    mapping = {
        "mappings": {
            "properties": {
                "recipe_name": {"type": "text"},
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
                "img_src": {"type": "keyword"}
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

        es.index(
            index=INDEX_NAME,
            document=doc
        )

        count += 1

    return f"{count} recipes indexed successfully!"