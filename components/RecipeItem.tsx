import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "../assets/images";

export default function RecipeItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      accessible={true}
      accessibilityLabel="Recipe Item"
      accessibilityHint="Navigates to the detail page"
    >
      <View style={styles.wrapper}>
        <Image source={images[props.image]} style={styles.img} />
        <Text style={styles.nameText}>{props.name}</Text>
        <Text style={styles.minuteText}>{props.minutes} min</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
    flex: 1,
  },
  img: { width: "50%", height: 100, margin: 15, paddingHorizontal: 10 },
  textContainer: { margin: 10 },
  nameText: {
    fontSize: 16,
  },
  minuteText: {
    fontSize: 12,
    color: "darkgray",
  },
});
