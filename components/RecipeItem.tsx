import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecipeItem(recipe) {
  return (
    <TouchableOpacity onPress={recipe.onPress}>
      <View style={styles.wrapper}>
        <Image
          source={require("../assets/pizzaPepperoni.jpg")}
          style={styles.img}
        />
        <View>
          <Text>{recipe.name}</Text>
          <Text>{recipe.minutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
    height: 60,
    width: "100%"
  },
  img: { width: 50, height: 50, margin: 15 },
  textContainer: { margin: 10 }
});
