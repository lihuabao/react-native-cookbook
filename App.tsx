import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeList from "./components/RecipeList";
import withFeatureToggle from "./withFeatureToggle";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetails from "./components/RecipeDetails";

const Stack = createStackNavigator();

export default function App() {
  const FinalComponent = withFeatureToggle(RecipeList, "RecipeList");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={RecipeList} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
      </Stack.Navigator>
    </NavigationContainer>
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
