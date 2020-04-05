import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import images from "../assets/images";

export default function RecipeDetails(props) {
  const { route } = props;
  const recipe = route.params.recipe;
  return (
    <ScrollView>
      <Image
        style={styles.img}
        source={images[recipe.image]}
        resizeMode="cover"
        accessibilityLabel="Sushi Image"
      />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>
          {recipe.name} ({recipe.minutes} min)
        </Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.ingredients}>
          {recipe.ingredients.map((ingredient) => (
            <Text key={ingredient}>
              {"\u2022" + " "}
              {ingredient} {"\n"}
            </Text>
          ))}
        </Text>
        <Text style={styles.title}>Steps:</Text>
        <Text>{recipe.steps}</Text>
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
