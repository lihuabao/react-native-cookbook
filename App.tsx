import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeItem from "./components/RecipeItem";

export default function App() {
  return (
    <View style={styles.container}>
      <RecipeItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30
  }
});
