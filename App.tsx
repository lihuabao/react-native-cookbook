import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RecipeList from "./components/RecipeList";
import withFeaureToggle from "./withFeatureToggle";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  const FinalComponent = withFeaureToggle(RecipeList, "RecipeList");
  // return <FinalComponent />;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FinalComponent} />
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
