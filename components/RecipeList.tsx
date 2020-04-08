import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import RecipeItem from "./RecipeItem";
import { RecipeContext } from "../context/recipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const RecipeList: React.FC<Props> = (props) => {
  const { recipes } = useContext(RecipeContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("New Recipe")}
      >
        <FontAwesomeIcon icon={faPlus} />
      </TouchableOpacity>
      <FlatList
        numColumns={2}
        style={{ padding: 15 }}
        data={recipes}
        keyExtractor={(recipe: Recipe) => recipe.id}
        renderItem={({ item }) => {
          return (
            <RecipeItem
              name={item.name}
              minutes={item.minutes}
              image={item.image}
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
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "pink",
    width: 30,
  },
});

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

interface Recipe {
  id: string;
  name: string;
  minutes: number;
  ingredients: Array<string>;
  steps: Array<string>;
  image: string;
}
export default RecipeList;
