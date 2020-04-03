import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecipeItem(recipe) {
  return (
    <TouchableOpacity onPress={recipe.onPress}
    accessible={true}
    accessibilityLabel="Recipe Item"
    accessibilityHint="Navigates to the detail page">
      <View style={styles.wrapper}>
        <Image
          source={require("../assets/pizzaPepperoni.jpg")}
          style={styles.img}
        />
        <View>
          <Text style= {styles.nameText}>{recipe.name}</Text>
          <Text style= {styles.minuteText}>{recipe.minutes} min</Text>
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
  textContainer: { margin: 10 },
  nameText: {
    fontSize: 16,
    
  },
  minuteText: {
    fontSize: 12,
    color: "darkgray",
  }
});
