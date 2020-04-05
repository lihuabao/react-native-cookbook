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
        <View>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text style={styles.minuteText}>{props.minutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
    height: 60,
    width: "100%",
  },
  img: { width: 50, height: 50, margin: 15 },
  textContainer: { margin: 10 },
  nameText: {
    fontSize: 16,
  },
  minuteText: {
    fontSize: 12,
    color: "darkgray",
  },
});
