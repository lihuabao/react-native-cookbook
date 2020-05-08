import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RecipeItem from "./RecipeItem";
import { RecipeContext } from "../context/recipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function RecipeListView({ navigation }) {
  const { recipes } = useContext(RecipeContext);
  const [searchInput, setSearchInput] = useState("");
  const [visibleRecipes, setVisibleRecipes] = useState(recipes);

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

  const filterSearchResult = () => {
    if (searchInput !== "") {
      const result = recipes.filter((r) => r.name === searchInput);
      setVisibleRecipes(result);
    } else {
      setVisibleRecipes(recipes);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            setVisibleRecipes(recipes);
            setSearchInput("");
          }}
        >
          {visibleRecipes !== recipes && (
            <FontAwesomeIcon icon={faArrowLeft} size={30} />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="search for recipe"
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(input) => setSearchInput(input)}
          onSubmitEditing={filterSearchResult}
        />
      </View>
      <FlatList
        numColumns={2}
        data={visibleRecipes}
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
  searchInput: {
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
    margin: 10,
    lineHeight: 30,
    fontSize: 25,
    padding: 5,
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
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
