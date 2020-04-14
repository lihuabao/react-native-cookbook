import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import RecipeItem from "./RecipeItem";
import { RecipeContext } from "../context/recipeContext";

const RecipeList: React.FC<Props> = (props) => {
  const { recipes } = useContext(RecipeContext);
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
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
export default RecipeList;
