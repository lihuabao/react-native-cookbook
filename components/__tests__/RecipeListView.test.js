import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeListView from "../RecipeListView";
import { RecipeContext } from "../../context/recipeContext";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: "",
}));

let recipes, navigation;

beforeAll(() => {
  const setOptions = jest.fn();
  navigation = { setOptions };
  recipes = [{ name: "Pizza" }];
});

it("should render", () => {
  const { getByTestId } = render(
    <RecipeContext.Provider value={{ recipes }}>
      <RecipeListView navigation={navigation} />
    </RecipeContext.Provider>
  );

  expect(getByTestId("recipeItemList")).toBeDefined();
});

it("should show recipes from context", () => {
  const { getByTestId, getByText } = render(
    <RecipeContext.Provider value={{ recipes }}>
      <RecipeListView navigation={navigation} />
    </RecipeContext.Provider>
  );

  expect(getByTestId("recipeItemList").props.data).toBe(recipes);
  expect(getByText("Pizza")).toBeDefined();
});
