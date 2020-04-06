import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";

export default function RecipeCreationView(props) {
  const { saveRecipe } = useContext(RecipeContext);

  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");

  const addNewRecipe = () => {
    const parsedIngredients = parseStringToArray(ingredients);
    const parsedDirections = parseStringToArray(directions);
    saveRecipe({ name, minutes, parsedIngredients, parsedDirections });
  };

  const parseStringToArray = (string) => {
    return string.split(/\r?\n/);
  };

  const onSaveRecipe = () => {
    addNewRecipe();
    props.navigation.navigate("Recipes");
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={(text) => setName(text)}
      />
      <Text>Duration:</Text>
      <TextInput
        value={minutes}
        style={styles.input}
        onChangeText={(text) => setMinutes(text)}
      />
      <Text>Ingredients:</Text>
      <TextInput
        multiline
        value={ingredients}
        style={styles.input}
        onChangeText={(text) => setIngredients(text)}
      />
      <Text>Directions:</Text>
      <TextInput
        multiline
        value={directions}
        style={styles.input}
        onChangeText={(text) => setDirections(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});
