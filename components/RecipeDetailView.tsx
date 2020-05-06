import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import images from "../assets/images";
import { RecipeContext } from "../context/recipeContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function RecipeDetailView({ route, navigation }) {
  const { recipes, dispatch } = useContext(RecipeContext);
  const id = route.params.item.id;
  const currentRecipe = recipes.find((r) => r.id === id);

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          testID="deleteBtn"
          style={styles.button}
          onPress={createTwoButtonAlert}
        >
          <FontAwesomeIcon icon={faTrash} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Edit Recipe", {
              ...route.params,
            })
          }
        >
          <FontAwesomeIcon icon={faPencilAlt} size={20} />
        </TouchableOpacity>
      </View>
    ),
  });

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "Delete the recipe?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "OK",
          onPress: () => {
            dispatch({ type: "remove", obj: currentRecipe });
            navigation.navigate("Recipes");
          },
        },
      ],
      { cancelable: false }
    );

  if (!currentRecipe) return null;
  return (
    <ScrollView testID="detailView">
      <Image
        style={styles.img}
        source={images[currentRecipe.image]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.headerTitle}>
          {currentRecipe.name} ({currentRecipe.minutes} min)
        </Text>
        <Text style={styles.title}>Ingredients:</Text>
        <Text style={styles.ingredients}>
          {currentRecipe.ingredients.map((ingredient) => (
            <Text key={ingredient.name}>
              {`\u2022 ${ingredient.qty} ${ingredient.name} \n`}
            </Text>
          ))}
        </Text>
        <Text style={styles.title}>Steps:</Text>
        {currentRecipe.steps.map((step, index) => (
          <Text key={index.toString()}>{`${index + 1}. ${step} \n`}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  button: {
    alignItems: "center",
    alignSelf: "flex-end",
    padding: 15,
    width: 60,
    height: 60,
  },
  img: {
    flex: 1,
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  content: {
    flex: 2,
    padding: 15,
  },
  headerTitle: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 21,
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  ingredients: {
    marginBottom: 15,
  },
});
