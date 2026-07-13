from app.elastic import es
from app.embeddings import get_embedding


def vector_search(query: str, size: int = 5):
    query = f"Represent this sentence for searching relevant recipes: {query}"
    query_vector = get_embedding(query)

    response = es.search(
        index="recipes",
        knn={
            "field": "embedding",
            "query_vector": query_vector,
            "k": size,
            "num_candidates": 50
        }
    )

    recipes = []

    for hit in response["hits"]["hits"]:

        recipe = hit["_source"]
        recipe["score"] = hit["_score"]

        recipes.append(recipe)

    return recipes