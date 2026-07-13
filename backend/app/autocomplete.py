from app.elastic import es


def autocomplete(query: str):

    response = es.search(
        index="recipes",
        size=10,
        query={
            "multi_match": {
                "query": query,
                "type": "bool_prefix",
                "fields": [
                    "recipe_name",
                    "recipe_name._2gram",
                    "recipe_name._3gram"
                ]
            }
        }
    )

    suggestions = []

    seen = set()

    for hit in response["hits"]["hits"]:

        recipe = hit["_source"]["recipe_name"]

        if recipe not in seen:
            suggestions.append(recipe)
            seen.add(recipe)

    return suggestions