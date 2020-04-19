import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { parseStringToArray, lettersOnly, numbersOnly } from "../helpers.js";

export default function RecipeCreateView(props) {
  const { dispatch } = useContext(RecipeContext);

  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [multilineHeight, setMultiplineHeight] = useState(0);

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
      <View style={styles.inputWrap}>
        <Text>Name:</Text>
        <TextInput
          value={name}
          style={styles.input}
          onChangeText={(text) => setName(lettersOnly(text))}
          maxLength={25}
        />
      </View>
      <View style={styles.inputWrap}>
        <Text>Duration:</Text>
        <View style={styles.row}>
          <View style={styles.inlineWrap}>
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
      <View style={styles.inputWrap}>
        <Text>Ingredients:</Text>
        <View style={styles.row}>
          <TextInput
            value={ingredients}
            style={styles.inlineInput}
            onChangeText={(text) => setIngredients(text)}
          />
          <Text>Qty:</Text>
          <TextInput
            value={ingredients}
            style={styles.inlineInput}
            onChangeText={(text) => setIngredients(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
          <Text>Add a ingredient</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrap}>
        <Text>Steps:</Text>
        <TextInput
          multiline
          value={steps}
          style={[styles.input, { height: Math.max(35, multilineHeight) }]}
          onChangeText={(text) => setSteps(text)}
          onContentSizeChange={(event) => {
            setMultiplineHeight(event.nativeEvent.contentSize.height);
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
        <Text>Add a step</Text>
      </TouchableOpacity>
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
  inputWrap: {
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
  },
  inlineWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  inlineInput: {
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  input: {
    justifyContent: "flex-end",
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
  picker: {
    height: 30,
    width: 80,
    alignSelf: "center",
  },
});
