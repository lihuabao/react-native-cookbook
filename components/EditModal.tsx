import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function EditModal(props) {
  const { isVisible, onToggleModal, itemToBeEdited } = props;
  const obj = itemToBeEdited[0];

  const [ingredientName, setIngredientName] = useState(obj && obj.name);
  const [ingredientQty, setIngredientQty] = useState(obj && obj.qty);
  useEffect(() => {
    setIngredientName(obj && obj.name);
    setIngredientQty(obj && obj.qty);
  }, [itemToBeEdited]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        console.warn("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              value={ingredientName}
              // onChangeText={}
            />
            <Text>Qty:</Text>
            <TextInput
              style={styles.input}
              value={ingredientQty}
              // onChangeText={}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                onToggleModal(isVisible);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                onToggleModal(isVisible);
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
