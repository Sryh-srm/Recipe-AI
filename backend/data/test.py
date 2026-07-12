import pandas as pd

df = pd.read_csv("recipes.csv")

# print(df.head())

# print("\nShape:")
# print(df.shape)

# print("\nColumns:")
# print(df.columns.tolist())

# print("\nInfo:")
# print(df.info())

# print("\nMissing Values:")
# print(df.isnull().sum())

mask = (
    df["ingredients"].str.contains("mushroom", case=False, na=False) |
    df["directions"].str.contains("mushroom", case=False, na=False) |
    df["recipe_name"].str.contains("mushroom", case=False, na=False)
)

print(df.loc[mask, ["recipe_name", "ingredients"]])