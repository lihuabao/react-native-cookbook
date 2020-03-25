import React, { Component } from 'react'
import { Text, View, Image } from "react-native";



export default function RecipeItem () {
    return (
    <View>
      <Image source={require('../assets/pizzaPepperoni.jpg')} style = {{ width: 200, height: 200 }}/>
      <Text>Apfelstrudel</Text>
      <Text>30 Minutes</Text>
    </View>
  );
  }
