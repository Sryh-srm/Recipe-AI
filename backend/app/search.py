from app.elastic import es


def search_recipes(
    query: str,
    cuisine: str = None,
    rating: float = None,
    size: int = 5
):

    must_queries = [
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
    ]

    filters = []

    if cuisine:
        filters.append({
            "match_phrase": {
                "cuisine_path": cuisine
            }
        })

    if rating is not None:
        filters.append({
            "range": {
                "rating": {
                    "gte": rating
                }
            }
        })

    response = es.search(
        index="recipes",
        size=size,

        query={
            "bool": {
                "must": must_queries,
                "filter": filters
            }
        },

        highlight={
            "fields": {
                "recipe_name": {},
                "ingredients": {},
                "directions": {}
            }
        }
    )

    recipes = []

    for hit in response["hits"]["hits"]:

        recipe = hit["_source"]

        recipe["score"] = hit["_score"]

        if "highlight" in hit:
            recipe["highlight"] = hit["highlight"]

        recipes.append(recipe)

    return recipes