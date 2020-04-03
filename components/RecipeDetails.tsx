import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import RecipeItem from "./RecipeItem";


const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%"
  },
  title:{
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold"
  },
  img: { 
    flex: 1, 
    width:"100%",
    height: 200,
    marginBottom: 15  
  },
  ingredients: {

  },
  paragraph: {
  },
  content: {
    flex: 2, margin: 15
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
        source={require("../assets/sushiIMG.jpg")}
        resizeMode="contain" 
      />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name} ({recipe.minutes} min)</Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.ingredients}>{recipe.ingredients.map(ingredient => (<Text key={ingredient}>{ingredient} {"\n"}</Text>))}</Text>
        <Text style={styles.title}>Steps:</Text>
        <Text style={styles.paragraph} numberOfLines={5} >{recipe.steps}</Text>
      </View>
    </View>
  );
}
