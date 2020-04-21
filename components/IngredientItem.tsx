import React from "react";
import Swipeout from "react-native-swipeout";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function IngredientItem(props) {
  const { ingredient, onDeleteHandler } = props;
  let swipeBtns = [
    {
      text: "Delete",
      backgroundColor: "red",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      onPress: () => {
        onDeleteHandler(ingredient.name);
      }
    }
  ];

  return (
    <Swipeout right={swipeBtns} autoClose="true" backgroundColor="transparent">
      <TouchableOpacity style={styles.ingredientItem} key={ingredient.name}>
        <Text
          style={{ justifyContent: "center" }}
        >{`\u2022 ${ingredient.name} ${ingredient.qty}\n`}</Text>
      </TouchableOpacity>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  ingredientItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "column"
  }
});
