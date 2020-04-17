import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { parseStringToArray, lettersOnly, numbersOnly } from "../helpers.js";

export default function RecipeCreateView(props) {
  const { dispatch } = useContext(RecipeContext);

  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const addNewRecipe = () => {
    const parsedIngredients = parseStringToArray(ingredients);
    const parsedsteps = parseStringToArray(steps);
    dispatch({
      type: "add",
      obj: {
        name: name,
        minutes: minutes,
        ingredients: parsedIngredients,
        steps: parsedsteps,
      },
    });
  };

  const onSaveRecipe = () => {
    addNewRecipe();
    props.navigation.navigate("Recipes");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text>Name:</Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(lettersOnly(text))}
          maxLength={25}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Duration:</Text>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <TextInput
              keyboardType="numeric"
              value={minutes}
              style={styles.inlineInput}
              maxLength={3}
              onChangeText={(input) =>
                (numbersOnly(input) || input === "") && setMinutes(input)
              }
            />
            <Text>min</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Ingredients:</Text>
        <TextInput
          multiline
          value={ingredients}
          style={styles.multilineInput}
          onChangeText={(text) => setIngredients(text)}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text>Steps:</Text>
        <TextInput
          multiline
          value={steps}
          style={styles.multilineInput}
          onChangeText={(text) => setSteps(text)}
        />
      </View>
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
  inputWrapper: {
    marginVertical: 20,
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
    borderColor: "black",
    borderBottomWidth: 1,
  },
  input: {
    height: 30,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  multilineInput: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "sandybrown",
    padding: 10,
    marginVertical: 10,
  },
});
