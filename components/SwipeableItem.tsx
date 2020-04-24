import React from "react";
import Swipeout from "react-native-swipeout";
import { Text, StyleSheet, TouchableHighlight } from "react-native";

export default function SwipeableItem(props) {
  const { ingredient, step, onDeleteHandler, onEditHandler, index } = props;

  const itemType = ingredient ? ingredient.name : step;

  let swipeBtns = [
    {
      text: "Edit",
      backgroundColor: "green",
      onPress: () => {
        onEditHandler(itemType);
      },
    },
    {
      text: "Delete",
      backgroundColor: "red",
      onPress: () => {
        onDeleteHandler(itemType);
      },
    },
  ];

  return (
    <Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
      <TouchableHighlight
        underlayColor="rgba(192,192,192,1)"
        style={styles.SwipeableItem}
      >
        {ingredient ? (
          <Text>{`\u2022 ${ingredient.name} ${ingredient.qty}`}</Text>
        ) : (
          <Text>{`${(index + 1).toString()}. ${step}`}</Text>
        )}
      </TouchableHighlight>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  SwipeableItem: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
});
