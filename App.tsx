import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
   return RecipeItem();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const RecipeItem = () => {
  return (
  <View>
    <Text>Apfelstrudel</Text>
    <Text>30 Minutes</Text>
  </View>
);
}
