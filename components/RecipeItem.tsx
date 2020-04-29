import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import images from "../assets/images";

export default function RecipeItem(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        testID="recipeItemBtn"
      >
        <Image
          style={styles.img}
          resizeMode="cover"
          source={images[props.image]}
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
    maxWidth: "50%",
    height: Dimensions.get("screen").width / 2,
  },
  button: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: "80%",
  },
  textWrapper: {
    height: "20%",
  },
  nameText: {
    fontSize: 16,
  },
  minuteText: {
    fontSize: 12,
    color: "dimgray",
  },
});
