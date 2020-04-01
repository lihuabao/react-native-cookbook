import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#000",
    marginBottom: 2,
    borderBottomWidth: 1,
    height: 60,
    width: "100%"
  },
  img: { width: 50, height: 50, margin: 15 },
  textContainer: { margin: 10 }
});

export default function RecipeItem(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.wrapper}>
        <Image
          source={require("../assets/pizzaPepperoni.jpg")}
          style={styles.img}
        />
        <View>
          <Text>{props.name}</Text>
          <Text>{props.minutes} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
