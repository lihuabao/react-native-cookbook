import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { lettersOnly, numbersOnly } from "../helpers.js";
import SwipeableItem from "./SwipeableItem";
import EditModal from "./EditModal";

export default function RecipeEditView(props) {
  const { recipes, dispatch } = useContext(RecipeContext);
  const id = props.route.params.item.id;
  const currentRecipe = recipes.find(r => r.id === id);

  const [name, setName] = useState(currentRecipe.name);
  const [minutes, setMinutes] = useState(currentRecipe.minutes.toString());
  const [image, setImage] = useState(currentRecipe.image);
  const [ingredientList, setIngredientList] = useState(
    currentRecipe.ingredients
  );
  const [stepList, setStepList] = useState(currentRecipe.steps);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState({});
  const [itemIndex, setItemIndex] = useState();

  useEffect(() => {}, [ingredientList, stepList]);

  const deleteIngredient = name => {
    const updatedList = ingredientList.filter(i => i.name !== name);
    setIngredientList(updatedList);
  };

  const deleteStep = step => {
    const updatedList = stepList.filter(s => s !== step);
    setStepList(updatedList);
  };

  const editIngredient = name => {
    const toBeEditedIngredient = ingredientList.find(i => i.name === name);
    setItemBeingEdited(toBeEditedIngredient);
    const index = ingredientList.findIndex(i => i.name === name);
    setItemIndex(index);
    setModalVisible(true);
  };

  const editStep = () => {};

  const onToggleModal = isVisible => {
    setModalVisible(!isVisible);
  };

  const updateIngredient = ingredient => {
    const updatedList = ingredientList.map((i, index) => {
      if (index === itemIndex) {
        i = ingredient;
      }
      return i;
    });
    setIngredientList(updatedList);
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
        steps: stepList
      }
    });
  };

  const onSaveRecipe = () => {
    editRecipe();
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputWrap}>
          <Text>Name:</Text>
          <TextInput
            value={name}
            style={styles.input}
            onChangeText={input => setName(lettersOnly(input))}
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
                onChangeText={input =>
                  (numbersOnly(input) || input === "") && setMinutes(input)
                }
              />
              <Text>min</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text>Ingredients:</Text>
          {ingredientList.map(ingredient => (
            <SwipeableItem
              key={ingredient.name}
              ingredient={ingredient}
              onEditHandler={editIngredient}
              onDeleteHandler={deleteIngredient}
            />
          ))}
        </View>
        <EditModal
          isVisible={modalVisible}
          onToggleModal={onToggleModal}
          itemToBeEdited={itemBeingEdited}
          onSaveHandler={updateIngredient}
        />
        <View style={styles.inputWrap}>
          <Text>Steps:</Text>
          {stepList.map((step, index) => (
            <SwipeableItem
              key={index}
              step={step}
              onEditHandler={editStep}
              onDeleteHandler={deleteStep}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
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
    flexDirection: "row"
  },
  inlineWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  inlineInput: {
    flex: 1,
    height: 30,
    borderColor: "black",
    borderBottomWidth: 1
  },
  input: {
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
  button: {
    alignItems: "center",
    backgroundColor: "sandybrown",
    padding: 10,
    marginVertical: 10
  }
});
