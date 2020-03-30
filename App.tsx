import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeList from "./components/RecipeList";
import withFeaureToggle from "./withFeatureToggle";

export default function App() {
  const FinalComponent = withFeaureToggle(RecipeList, "RecipeList");
  return <FinalComponent />;
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
