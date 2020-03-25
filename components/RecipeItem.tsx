import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#000",
    borderWidth: 1,
    height: 60,
    width: "100%"
  },
  img: { width: 50, height: 50, margin: 15 },
  textContainer: { margin: 10 }
});

export default function RecipeItem() {
  return (
    <View style={styles.wrapper}>
      <Image
        source={require("../assets/pizzaPepperoni.jpg")}
        style={styles.img}
      />
      <View>
        <Text>Apfelstrudel</Text>
        <Text>30 Minutes</Text>
      </View>
    </View>
  );
}
