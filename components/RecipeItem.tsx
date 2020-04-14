import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "../assets/images";

export default function RecipeItem(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        accessible={true}
        accessibilityLabel="Recipe Item"
        accessibilityHint="Navigates to the detail page"
      >
        <Image
          resizeMode="cover"
          source={images[props.image]}
          style={styles.img}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.minuteText}>{props.minutes} min</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    maxWidth: "50%",
    minHeight: "100%",
  },
  button: { width: "100%", height: "100%", flex: 1 },
  img: { width: "100%", height: "80%" },
  textWrapper: { height: "20%" },
  nameText: {
    fontSize: 16,
  },
  minuteText: {
    fontSize: 12,
    color: "dimgray",
  },
});
