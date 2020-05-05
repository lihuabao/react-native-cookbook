import React, { useState, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { lettersOnly, numbersOnly } from "../helpers";
import SwipeableItem from "./SwipeableItem";
import EditModal from "./EditModal";

export default function RecipeCreateEditView(props) {
  const screen = props.route.name;
  const { recipes, dispatch } = useContext(RecipeContext);

  const isNewRecipe = screen == "New Recipe";
  const id = isNewRecipe ? undefined : props.route.params.item.id;
  const emptyRecipe = {
    name: "",
    minutes: "",
    image: "",
    ingredients: [],
    steps: [],
  };
  const currentRecipe = isNewRecipe
    ? emptyRecipe
    : recipes.find((r) => r.id === id);

  const [name, setName] = useState(currentRecipe.name);
  const [minutes, setMinutes] = useState(currentRecipe.minutes.toString());
  const [image, setImage] = useState(currentRecipe.image);
  const [ingredientList, setIngredientList] = useState(
    currentRecipe.ingredients
  );
  const [stepList, setStepList] = useState(currentRecipe.steps);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState();
  const [itemIndex, setItemIndex] = useState();
  const [itemType, setItemType] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("");
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

  const deleteIngredient = (name) => {
    const updatedList = ingredientList.filter((i) => i.name !== name);
    setIngredientList(updatedList);
  };

  const deleteStep = (step) => {
    const updatedList = stepList.filter((s) => s !== step);
    setStepList(updatedList);
  };

  const editIngredient = (name) => {
    setItemType("ingredient");
    const index = ingredientList.findIndex((i) => i.name === name);
    setItemIndex(index);
    setItemBeingEdited(ingredientList[index]);
    setModalVisible(true);
  };

  const editStep = (step) => {
    setItemType("step");
    const index = stepList.findIndex((s) => s === step);
    setItemIndex(index);
    setItemBeingEdited(stepList[index]);
    setModalVisible(true);
  };

  const onToggleModal = (isVisible) => {
    setModalVisible(!isVisible);
  };

  const updateItem = (item) => {
    const itemList = itemType === "ingredient" ? ingredientList : stepList;
    const updatedList = itemList.map((i, index) => {
      if (index === itemIndex) {
        i = item;
      }
      return i;
    });
    const setList = itemType === "ingredient" ? setIngredientList : setStepList;
    setList(updatedList);
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
  const editRecipe = () => {
    dispatch({
      type: "update",
      obj: {
        id,
        name,
        image,
        minutes,
        ingredients: ingredientList,
        steps: stepList,
      },
    });
  };

  const onSaveRecipe = () => {
    isNewRecipe ? addNewRecipe() : editRecipe();
    props.navigation.goBack();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.inputWrap}>
          <Text>Name:</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={(input) => setName(lettersOnly(input))}
            maxLength={25}
          />
        </View>
        <View style={styles.inputWrap}>
          <Text>Duration:</Text>
          <View style={styles.row}>
            <View style={styles.inlineWrap}>
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
        <View style={styles.inputWrap}>
          <Text>Ingredients:</Text>
          <FlatList
            data={ingredientList}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <SwipeableItem
                key={item.name}
                ingredient={item}
                onEditHandler={editIngredient}
                onDeleteHandler={deleteIngredient}
              />
            )}
          />
        </View>
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
        <View style={styles.inputWrap}>
          <Text>Steps:</Text>
          <FlatList
            data={stepList}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <SwipeableItem
                key={item}
                index={index}
                step={item}
                onEditHandler={editStep}
                onDeleteHandler={deleteStep}
              />
            )}
          />
        </View>
        <View>
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
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addStep}>
          <Text>Add a step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
          <Text>Save</Text>
        </TouchableOpacity>
        <EditModal
          isVisible={modalVisible}
          onToggleModal={onToggleModal}
          itemToBeEdited={itemBeingEdited}
          onSaveHandler={updateItem}
          itemType={itemType}
        />
      </View>
    </ScrollView>
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
  inlineText: {
    marginHorizontal: 5,
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
  addButton: {
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
    backgroundColor: "peachpuff",
  },
});
