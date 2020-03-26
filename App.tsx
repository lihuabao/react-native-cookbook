import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeItem from "./components/RecipeItem";
import recipeData from  "./recipeData.json"

export default function App() {
  return (
    <View style={styles.container}>
      {recipeData.recipes.map(recipe => ( <RecipeItem name= {recipe.name} minutes = {recipe.minutes} key ={recipe.name}/>))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  }
});
