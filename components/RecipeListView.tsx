import React, { useContext } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import RecipeItem from "./RecipeItem";
import { RecipeContext } from "../context/recipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RecipeListView({ navigation }) {
  const { recipes } = useContext(RecipeContext);

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("New Recipe")}
      >
        <FontAwesomeIcon icon={faPlus} size={20} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={recipes}
        keyExtractor={(recipe: Recipe) => recipe.id}
        testID="recipeItemList"
        renderItem={({ item }) => {
          return (
            <RecipeItem
              name={item.name}
              minutes={item.minutes}
              image={item.image}
              title="Go to Detail Screen"
              onPress={() => {
                navigation.navigate("Recipe Details", { item });
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 15,
    width: 60,
    height: 60,
  },
});

interface Props {
  navigation: Navigation;
  route: Route;
}

interface Navigation {
  navigate(string, params?): string;
}
interface Route {
  key: string;
  name: string;
}

interface Recipe {
  id: string;
  name: string;
  minutes: number;
  ingredients: Array<string>;
  steps: Array<string>;
  image: string;
}
