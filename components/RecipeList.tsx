import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import RecipeItem from "./RecipeItem";
import recipeData from "../recipeData.json";

export interface Props {
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

const RecipeList: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("New Recipe")}
      >
        <Text>Add Recipe</Text>
      </TouchableOpacity>
      <FlatList
        data={recipeData.recipes}
        keyExtractor={(recipe) => recipe.name}
        renderItem={({ item }) => {
          return (
            <RecipeItem
              name={item.name}
              minutes={item.minutes}
              image={item.image}
              key={item.name}
              title="Go to Detail Screen"
              onPress={() => {
                props.navigation.navigate("Recipe Details", { item });
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default RecipeList;
