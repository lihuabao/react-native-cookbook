import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import withFeatureToggle from "./withFeatureToggle";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeCreationView from "./components/RecipeCreationView";
import RecipeProvider from "./context/recipeContext";

const Stack = createStackNavigator();

export default function App() {
  const FinalComponent = withFeatureToggle(RecipeList, "RecipeList");
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen name="Recipes" component={RecipeList} />
          <Stack.Screen name="Recipe Details" component={RecipeDetails} />
          <Stack.Screen name="New Recipe" component={RecipeCreationView} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
});
