import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
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

  function fuzzyMatch(str, input) {
    input = input.split("").reduce(function(a, b) {
      return a + "[^" + b + "]*" + b;
    });
    return new RegExp(input).test(str);
  }

  const filterSearchResult = () => {
    if (searchInput !== "") {
      const result = recipes.filter(
        (r) =>
          r.name === searchInput ||
          r.name.includes(searchInput) ||
          fuzzyMatch(r.name, searchInput)
      );
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
          autoCorrect={false}
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(input) => setSearchInput(input)}
          onSubmitEditing={filterSearchResult}
        />
      </View>
      {visibleRecipes.length !== 0 ? (
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
      ) : (
        <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 40 }}>
          Sorry, there is no match for your search.
        </Text>
      )}
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
    padding: 15,
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
