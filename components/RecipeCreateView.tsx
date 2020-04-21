import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { lettersOnly, numbersOnly } from "../helpers.js";
import Swipeout from "react-native-swipeout";
import IngredientItem from "./IngredientItem";

export default function RecipeCreateView(props) {
  const { dispatch } = useContext(RecipeContext);

  const [name, setName] = useState("");
  const [minutes, setMinutes] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [step, setStep] = useState("");
  const [stepList, setStepList] = useState([]);
  const [multilineHeight, setMultiplineHeight] = useState(0);

  useEffect(() => {}, [ingredientList, stepList]);

  const addIngredient = () => {
    const item = { name: ingredient, qty: amount };
    setIngredientList([...ingredientList, item]);
    setIngredient("");
    setAmount("");
  };

  const addStep = () => {
    setStepList([...stepList, step]);
    setStep("");
  };

  const addNewRecipe = () => {
    dispatch({
      type: "add",
      obj: {
        name: name,
        minutes: minutes,
        ingredients: ingredientList,
        steps: stepList
      }
    });
  };

  const onSaveRecipe = () => {
    addNewRecipe();
    props.navigation.navigate("Recipes");
  };

  const deleteIngredient = name => {
    const updatedList = ingredientList.filter(i => i.name !== name);
    setIngredientList(updatedList);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputWrap}>
          <Text style={styles.inputTitle}>Name:</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={text => setName(lettersOnly(text))}
            maxLength={25}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.inputTitle}>Time:</Text>
          <View style={styles.row}>
            <View style={styles.inlineWrap}>
              <TextInput
                keyboardType="numeric"
                value={minutes}
                style={styles.inlineInput}
                maxLength={3}
                onChangeText={input =>
                  (numbersOnly(input) || input === "") && setMinutes(input)
                }
              />
              <Text>min</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.inputTitle}>Ingredients:</Text>
          {ingredientList.map(ingredient => (
            <IngredientItem
              ingredient={ingredient}
              onDeleteHandler={deleteIngredient}
            />
          ))}
          <View style={styles.row}>
            <TextInput
              value={ingredient}
              style={styles.inlineInput}
              onChangeText={text => setIngredient(text)}
            />
            <Text>Qty:</Text>
            <TextInput
              value={amount}
              style={styles.inlineInput}
              onChangeText={text => setAmount(text)}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text>Add an ingredient</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.inputTitle}>Steps:</Text>
          {stepList.map((step, index) => (
            <Text key={index.toString()}>{`${index + 1}. ${step} \n`}</Text>
          ))}
          <TextInput
            multiline
            value={step}
            style={[styles.input, { height: Math.max(35, multilineHeight) }]}
            onChangeText={text => setStep(text)}
            onContentSizeChange={event => {
              setMultiplineHeight(event.nativeEvent.contentSize.height);
            }}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addStep}>
          <Text>Add a step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSaveRecipe}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  inputWrap: {
    marginVertical: 20
  },
  row: {
    flexDirection: "row",
    marginVertical: 20
  },
  inlineWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  inlineInput: {
    flex: 1,
    borderColor: "black",
    borderBottomWidth: 1
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    justifyContent: "flex-end",
    height: 30,
    borderColor: "black",
    borderBottomWidth: 1
  },
  multilineInput: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10
  },
  addButton: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    backgroundColor: "peachpuff"
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "sandybrown",
    padding: 10,
    marginVertical: 10
  }
});
