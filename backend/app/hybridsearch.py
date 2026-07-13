from app.elastic import es
from app.embeddings import get_embedding


def hybrid_search(query: str, size: int = 5):

    embedding_query = (
        f"Represent this query for retrieving relevant recipes: {query}"
    )

    query_vector = get_embedding(embedding_query)

    response = es.search(
        index="recipes",
        size=size,
        retriever={
            "rrf": {
                "retrievers": [
                    {
                        "standard": {
                            "query": {
                                "multi_match": {
                                    "query": query,
                                    "fields": [
                                        "recipe_name^4",
                                        "ingredients^3",
                                        "directions",
                                        "nutrition"
                                    ],
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    },
                    {
                        "knn": {
                            "field": "embedding",
                            "query_vector": query_vector,
                            "k": 50,
                            "num_candidates": 100
                        }
                    }
                ]
            }
        }
    )

    recipes = []

    for hit in response["hits"]["hits"]:

        recipe = hit["_source"]
        recipe["score"] = hit["_score"]

        recipes.append(recipe)

    return recipes