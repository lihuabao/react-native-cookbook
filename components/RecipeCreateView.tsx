import React, { useState, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { lettersOnly, numbersOnly } from "../helpers";
import { SwipeListView } from "react-native-swipe-list-view";
import SwipeableItem from "./SwipeableItem";

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

  const ingredientRef = useRef(null);
  const stepRef = useRef(null);

  const addIngredient = () => {
    const item = { name: ingredient, qty: amount };
    setIngredientList([...ingredientList, item]);
    setIngredient("");
    setAmount("");
    ingredientRef.current.focus();
  };

  const addStep = () => {
    setStepList([...stepList, step]);
    setStep("");
    stepRef.current.focus();
  };

  const addNewRecipe = () => {
    dispatch({
      type: "add",
      obj: {
        name: name,
        minutes: minutes,
        ingredients: ingredientList,
        steps: stepList,
      },
    });
  };

  const onSaveRecipe = () => {
    addNewRecipe();
    props.navigation.navigate("Recipes");
  };

  const deleteIngredient = (name) => {
    const updatedList = ingredientList.filter((i) => i.name !== name);
    setIngredientList(updatedList);
  };

  const deleteStep = (step) => {
    const updatedList = stepList.filter((s) => s !== step);
    setStepList(updatedList);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={true}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.inputWrap}>
            <Text style={styles.inputTitle}>Name:</Text>
            <TextInput
              value={name}
              style={styles.input}
              onChangeText={(text) => setName(lettersOnly(text))}
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
                  onChangeText={(input) =>
                    (numbersOnly(input) || input === "") && setMinutes(input)
                  }
                />
                <Text>min</Text>
              </View>
            </View>
          </View>
          <Text style={styles.inputTitle}>Ingredients:</Text>
          <SwipeListView
            data={ingredientList}
            renderItem={({ item }) => (
              <SwipeableItem
                key={item.name}
                ingredient={item}
                onDeleteHandler={deleteIngredient}
              />
            )}
          />

          <View style={styles.row}>
            <TextInput
              value={ingredient}
              style={styles.inlineInput}
              onChangeText={(text) => setIngredient(text)}
              ref={ingredientRef}
            />
            <Text style={styles.inlineText}>Qty:</Text>
            <TextInput
              value={amount}
              style={styles.inlineInput}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
            <Text>Add an ingredient</Text>
          </TouchableOpacity>
          <Text style={styles.inputTitle}>Steps:</Text>
          <SwipeListView
            data={stepList}
            renderItem={({ item, index }) => (
              <SwipeableItem
                key={index}
                index={index}
                step={item}
                onDeleteHandler={deleteStep}
              />
            )}
          />
          <TextInput
            multiline
            value={step}
            style={[styles.input, { height: Math.max(20, multilineHeight) }]}
            onChangeText={(text) => setStep(text)}
            onContentSizeChange={(event) => {
              setMultiplineHeight(event.nativeEvent.contentSize.height);
            }}
            ref={stepRef}
          />
          <TouchableOpacity style={styles.addButton} onPress={addStep}>
            <Text>Add a step</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSaveRecipe}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  inputWrap: {
    marginVertical: 20,
  },
  listWrap: {
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
  inlineText: {
    marginHorizontal: 5,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 1,
  },
  multilineInput: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
  },
  addButton: {
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
    backgroundColor: "peachpuff",
  },
  saveButton: {
    alignItems: "center",
    backgroundColor: "sandybrown",
    padding: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  item: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "green",
  },
});
