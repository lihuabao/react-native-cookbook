import React, { createContext, useState } from "react";
import recipeData from "../recipeData.json";

export const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(recipeData.recipes);
  const saveRecipe = (recipe) => {
    const newRecipe = {
      id: Math.random().toString(), // not really unique but it's just an example
      name: recipe.name,
      minutes: recipe.minutes,
      image: recipe.image ? recipe.image : "default",
      ingredients: recipe.ingredients,
      steps: recipe.steps,
    };
    setRecipes([newRecipe, ...recipes]);
  };
  return (
    <RecipeContext.Provider value={{ recipes, saveRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
