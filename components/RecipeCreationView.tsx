import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";

export default function RecipeCreationView(props) {
  const { saveRecipe } = useContext(RecipeContext);

  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const addNewRecipe = () => {
    const parsedIngredients = parseStringToArray(ingredients);
    const parsedsteps = parseStringToArray(steps);
    saveRecipe({
      name: name,
      minutes: minutes,
      ingredients: parsedIngredients,
      steps: parsedsteps,
    });
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
      <View style={styles.row}>
        <View style={styles.inputWrap}>
          <TextInput
            keyboardType="numeric"
            value={minutes}
            style={styles.inlineInput}
            onChangeText={(text) => setMinutes(text)}
          />
          <Text>min</Text>
        </View>
      </View>
      <Text>Ingredients:</Text>
      <TextInput
        multiline
        value={ingredients}
        style={styles.multilineInput}
        onChangeText={(text) => setIngredients(text)}
      />
      <Text>Steps:</Text>
      <TextInput
        multiline
        value={steps}
        style={styles.multilineInput}
        onChangeText={(text) => setSteps(text)}
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
  row: {
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inlineInput: {
    flex: 1,
    height: 30,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
  },
  input: {
    height: 30,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
  },
  multilineInput: {
    height: 100,
    borderColor: "#cccccc",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginVertical: 10,
  },
});
