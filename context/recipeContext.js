import React, { createContext, useReducer } from "react";
import recipeData from "../recipeData.json";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, dispatch] = useReducer((recipes, { type, obj }) => {
    switch (type) {
      case "add":
        const newRecipe = {
          id: Math.random().toString(), // not really unique but it's just an example
          name: obj.name,
          minutes: obj.minutes,
          image: obj.image ? obj.image : "default",
          ingredients: obj.ingredients,
          steps: obj.steps,
        };
        return [newRecipe, ...recipes];
      case "update":
        return recipes.map((recipe) => {
          if (recipe.id == obj.id) {
            recipe = obj;
          }
          return recipe;
        });
      case "remove":
        return recipes.filter((recipe) => recipe.id !== obj.id);
      default:
        return recipes;
    }
  }, recipeData.recipes);

  return (
    <RecipeContext.Provider value={{ recipes, dispatch }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
