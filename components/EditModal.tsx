import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from "react-native";

export default function EditModal(props) {
  const {
    isVisible,
    onToggleModal,
    itemToBeEdited,
    onSaveHandler,
    itemType,
  } = props;

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQty, setIngredientQty] = useState("");
  const [step, setStep] = useState("");
  const [multilineHeight, setMultiplineHeight] = useState(0);

  useEffect(() => {
    if (itemType === "ingredient") {
      setIngredientName(itemToBeEdited.name);
      setIngredientQty(itemToBeEdited.qty);
    } else {
      setStep(itemToBeEdited);
    }
  }, [itemToBeEdited]);

  const ingredientEditInput = () => (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={styles.input}
        value={ingredientName}
        onChangeText={(input) => setIngredientName(input)}
      />

      <Text>Qty:</Text>
      <TextInput
        style={styles.input}
        value={ingredientQty}
        onChangeText={(input) => setIngredientQty(input)}
      />
    </View>
  );

  const stepEditInput = () => (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        multiline
        value={step}
        style={[styles.input, { height: Math.max(35, multilineHeight) }]}
        onChangeText={(text) => setStep(text)}
        onContentSizeChange={(event) => {
          setMultiplineHeight(event.nativeEvent.contentSize.height);
        }}
      />
    </View>
  );

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
          {itemType === "ingredient" ? ingredientEditInput() : stepEditInput()}
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => onToggleModal(isVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                onToggleModal(isVisible);
                onSaveHandler(
                  itemType === "ingredient"
                    ? { name: ingredientName, qty: ingredientQty }
                    : step
                );
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
