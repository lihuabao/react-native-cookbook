import React from "react";
import Swipeout from "react-native-swipeout";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

export default function IngredientItem(props) {
  const { ingredient, onDeleteHandler, onEditHandler } = props;
  let swipeBtns = [
    {
      text: "Edit",
      backgroundColor: "green",
      onPress: () => {
        onEditHandler(ingredient.name);
      },
    },
    {
      text: "Delete",
      backgroundColor: "red",
      onPress: () => {
        onDeleteHandler(ingredient.name);
      },
    },
  ];

  return (
    <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
      <TouchableHighlight
        underlayColor="rgba(192,192,192,1)"
        style={styles.ingredientItem}
        key={ingredient.name}
      >
        <Text>{`\u2022 ${ingredient.name} ${ingredient.qty}`}</Text>
      </TouchableHighlight>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  ingredientItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
});
