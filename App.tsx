import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import withFeatureToggle from "./withFeatureToggle";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import RecipeCreateView from "./components/RecipeCreateView";
import RecipeEditView from "./components/RecipeEditView";
import RecipeProvider from "./context/recipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Stack = createStackNavigator();

export default function App() {
  const FinalComponent = withFeatureToggle(RecipeList, "RecipeList");
  return (
    <RecipeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen
            name="Recipes"
            component={RecipeList}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("New Recipe")}
                >
                  <FontAwesomeIcon icon={faPlus} size={20} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Recipe Details"
            component={RecipeDetails}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("Edit Recipe", {
                      ...route.params,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} size={20} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="New Recipe" component={RecipeCreateView} />
          <Stack.Screen name="Edit Recipe" component={RecipeEditView} />
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
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 15,
    width: 60,
    height: 60,
  },
});
