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

export default function RecipeEditView(props) {
  const parseArrayToString = (array) => {
    return array.join(",");
  };

  const { recipes, dispatch } = useContext(RecipeContext);
  const id = props.route.params.item.id;
  const currentRecipe = recipes.find((r) => r.id === id);
  const ingredientsString = parseArrayToString(currentRecipe.ingredients);
  const stepsString = parseArrayToString(currentRecipe.steps);

  const [name, setName] = useState(currentRecipe.name);
  const [minutes, setMinutes] = useState(currentRecipe.minutes.toString());
  const [image, setImage] = useState(currentRecipe.image);
  const [ingredients, setIngredients] = useState(ingredientsString);
  const [steps, setSteps] = useState(stepsString);

  const editRecipe = () => {
    const parsedIngredients = parseStringToArray(ingredients);
    const parsedsteps = parseStringToArray(steps);
    dispatch({
      type: "update",
      obj: {
        id,
        name,
        image,
        minutes,
        ingredients: parsedIngredients,
        steps: parsedsteps,
      },
    });
  };

  const onSaveRecipe = () => {
    editRecipe();
    props.navigation.goBack();
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
