import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeList from "./components/RecipeList";

export default function App() {
  return (
    <RecipeList />
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
