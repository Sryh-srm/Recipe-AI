from app.hybridsearch import hybrid_search
from app.llm import generate_response
def build_prompt(user_query: str):

    # Retrieve top matching recipes
    recipes = hybrid_search(query=user_query, size=3)

    if not recipes:
        return {
            "recipe_count": 0,
            "retrieved_recipes": [],
            "prompt": "No matching recipes found."
        }

    prompt = f"""
You are an expert cooking assistant.

IMPORTANT RULES:
- ONLY use the recipes provided below.
- NEVER invent recipes.
- If none of the retrieved recipes satisfy the user's request, say so.
- Base your recommendation ONLY on the retrieved recipes.

User Request:
{user_query}

Retrieved Recipes:
"""

    for i, recipe in enumerate(recipes, start=1):

        prompt += f"""

==========================================
Recipe {i}

Name:
{recipe['recipe_name']}

Cuisine:
{recipe['cuisine_path']}

Rating:
{recipe['rating']}

Prep Time:
{recipe['prep_time']}

Cook Time:
{recipe['cook_time']}

Ingredients:
{recipe['ingredients']}

Directions (Summary):
{recipe['directions'][:120]}...
"""

    prompt += """

==========================================

Using ONLY the recipes above:

1. Recommend the BEST recipe.
2. Explain WHY it matches the user's request.
3. Mention one alternative recipe.
4. Mention any limitations (time, ingredients, cuisine, etc.).
5. Never recommend recipes outside this list.
"""

    llm_result= generate_response(prompt)

    return {
    "user_query": user_query,

    "provider": llm_result["provider"],

    "model": llm_result["model"],

    "recipe_count": len(recipes),

    "recommendation": llm_result["response"],

    "retrieved_recipes": recipes
}