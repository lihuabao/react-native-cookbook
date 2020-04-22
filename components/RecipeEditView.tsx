import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableHighlight,
} from "react-native";
import { RecipeContext } from "../context/recipeContext";
import { lettersOnly, numbersOnly } from "../helpers.js";
import IngredientItem from "./IngredientItem";
import EditModal from "./EditModal";

export default function RecipeEditView(props) {
  const { recipes, dispatch } = useContext(RecipeContext);
  const id = props.route.params.item.id;
  const currentRecipe = recipes.find((r) => r.id === id);

  const [name, setName] = useState(currentRecipe.name);
  const [minutes, setMinutes] = useState(currentRecipe.minutes.toString());
  const [image, setImage] = useState(currentRecipe.image);
  const [ingredientList, setIngredientList] = useState(
    currentRecipe.ingredients
  );
  const [stepList, setStepList] = useState(currentRecipe.steps);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState([]);

  const deleteIngredient = (name) => {
    const updatedList = ingredientList.filter((i) => i.name !== name);
    setIngredientList(updatedList);
  };

  const onToggleModal = (isVisible) => {
    setModalVisible(!isVisible);
  };

  const editIngredient = (name) => {
    const toBeEditedIngredient = ingredientList.filter((i) => i.name === name);
    setItemBeingEdited(toBeEditedIngredient);
    setModalVisible(true);
    // openEditModal()
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
            onChangeText={(text) => setName(lettersOnly(text))}
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
          {ingredientList.map((ingredient) => (
            <IngredientItem
              key={ingredient.name}
              ingredient={ingredient}
              onEditHandler={editIngredient}
              onDeleteHandler={deleteIngredient}
            />
          ))}
        </View>
        <View style={styles.inputWrap}>
          <Text>Steps:</Text>
          {stepList.map((step, index) => (
            <Text key={index.toString()}>{`${index + 1}. ${step} \n`}</Text>
          ))}
        </View>
        <EditModal
          isVisible={modalVisible}
          onToggleModal={onToggleModal}
          itemToBeEdited={itemBeingEdited}
        />
        <TouchableOpacity style={styles.button} onPress={onSaveRecipe}>
          <Text>Save</Text>
        </TouchableOpacity>
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
