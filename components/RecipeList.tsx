import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeItem from "./RecipeItem";
import recipeData from "../recipeData.json";

export default function RecipeList(props) {
  


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipe</ Text >
      {recipeData.recipes.map(recipe => (
        <RecipeItem
          name={recipe.name}
          minutes={recipe.minutes}
          key={recipe.name}
          title="Go to Detail Screen"
          onPress={() => {props.navigation.navigate("RecipeDetails", {recipe})}}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9af",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  },
  text: {
      fontSize: 30
  }
});
