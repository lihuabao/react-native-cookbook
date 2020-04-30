import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";

export default function SwipeableItem(props) {
  const { ingredient, step, onDeleteHandler, onEditHandler, index } = props;

  const itemType = ingredient ? ingredient.name : step;

  const hiddenRow = (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => onEditHandler(itemType)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => onDeleteHandler(itemType)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const visibleRow = (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      {ingredient ? (
        <Text>{`\u2022 ${ingredient.name} ${ingredient.qty}`}</Text>
      ) : (
        <Text>{`${(index + 1).toString()}. ${step}`}</Text>
      )}
    </TouchableHighlight>
  );

  return (
    <SwipeRow rightOpenValue={-150}>
      {hiddenRow}
      {visibleRow}
    </SwipeRow>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingVertical: 10,
    flex: 1,
  },

  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
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
});
