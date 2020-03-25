import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeItem from "./components/RecipeItem";

export default function App() {
   return <RecipeItem/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});


