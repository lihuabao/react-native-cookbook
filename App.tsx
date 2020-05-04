import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeListView from "./components/RecipeListView";
import RecipeDetailView from "./components/RecipeDetailView";
import RecipeCreateEditView from "./components/RecipeCreateEditView";
import RecipeEditView from "./components/RecipeEditView";
import RecipeProvider from "./context/recipeContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen name="Recipes" component={RecipeListView} />
          <Stack.Screen name="Recipe Details" component={RecipeDetailView} />
          <Stack.Screen name="New Recipe" component={RecipeCreateEditView} />
          <Stack.Screen name="Edit Recipe" component={RecipeCreateEditView} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecipeProvider>
  );
}
