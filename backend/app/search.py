from app.elastic import es

INDEX_NAME = "recipes"

from app.elastic import es

INDEX_NAME = "recipes"

from app.elastic import es


from app.elastic import es

def search_recipes(query: str, cuisine: str = None, size: int = 5):

    filters = []

    if cuisine:
        filters.append({
            "wildcard": {
                "cuisine_path": f"*{cuisine}*"
            }
        })

    response = es.search(
        index="recipes",
        size=size,
        query={
            "bool": {
                "must": [
                    {
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
                ],
                "filter": filters
            }
        }
    )

    recipes = []

    for hit in response["hits"]["hits"]:
        recipe = hit["_source"]
        recipe["score"] = hit["_score"]
        recipes.append(recipe)

    return recipes