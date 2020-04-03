import React from "react";
import { StyleSheet, View } from "react-native";
import RecipeItem from "./RecipeItem";
import recipeData from "../recipeData.json";

export default function RecipeList(props) {
  return (
    <View style={styles.container}>
      {recipeData.recipes.map(recipe => (
        <RecipeItem
          name={recipe.name}
          minutes={recipe.minutes}
          key={recipe.name}
          title="Go to Detail Screen"
          onPress={() => {
            props.navigation.navigate("Recipe Details", { recipe });
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //marginVertical: 30
  },
  text: {
    fontSize: 30,
    padding: 10
  }
});
