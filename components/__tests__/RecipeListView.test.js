import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeListView from "../RecipeListView";
import { RecipeContext } from "../../context/recipeContext";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: "",
}));

it("should render", () => {
  const setOptions = jest.fn();
  const navigation = { setOptions };
  const recipes = [{ name: "Pizza" }];
  const { getByTestId } = render(
    <RecipeContext.Provider value={recipes}>
      <RecipeListView navigation={navigation} />
    </RecipeContext.Provider>
  );

  expect(getByTestId("recipeItemList")).toBeDefined();
});

it("should show recipes from context", () => {});
