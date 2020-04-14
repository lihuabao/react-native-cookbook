import React, { useEffect, useContext } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import images from "../assets/images";
import { RecipeContext } from "../context/recipeContext";

export default function RecipeDetails({ route }) {
  const { recipes } = useContext(RecipeContext);

  const id = route.params.item.id;
  const currentRecipe = recipes.find((r) => r.id === id);

  return (
    <ScrollView>
      <Image
        style={styles.img}
        source={images[currentRecipe.image]}
        resizeMode="cover"
        accessibilityLabel="Sushi Image"
      />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>
          {currentRecipe.name} ({currentRecipe.minutes} min)
        </Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.ingredients}>
          {currentRecipe.ingredients.map((ingredient) => (
            <Text key={ingredient}>
              {"\u2022" + " "}
              {ingredient} {"\n"}
            </Text>
          ))}
        </Text>
        <Text style={styles.title}>Steps:</Text>
        <Text>{currentRecipe.steps}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  img: {
    flex: 1,
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  content: {
    flex: 2,
    padding: 15,
  },
  headerTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 21,
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  ingredients: {
    marginBottom: 15,
  },
});
