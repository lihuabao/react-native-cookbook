import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import RecipeItem from "./RecipeItem";


const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#000",
    marginBottom: 2,
    borderBottomWidth: 1,
    width: "100%"
  },
  title:{
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold"
  },
  img: { flex: 1, width: undefined, height: undefined, margin: 15  },
  textContainer: { margin: 10 },
  ingredients: {

  },
  paragraph: {
    

  }
});

export default function RecipeDetails(props) {
  const {route, navigation} = props;
  console.log("DetailRoute", route)
  const recipe = route.params.recipe;
  
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.img}
        source={require("../assets/pizzaPepperoni.jpg")}
        resizeMode="contain" 
      />
      <View>
        <Text style={styles.title}>{recipe.name} ({recipe.minutes} min)</Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.ingredients}>{recipe.ingredients.map(ingredient => (<Text key={ingredient}>{ingredient} {"\n"}</Text>))}</Text>
        <Text style={styles.paragraph} numberOfLines={5} >{recipe.steps}</Text>
      </View>
    </View>
  );
}
