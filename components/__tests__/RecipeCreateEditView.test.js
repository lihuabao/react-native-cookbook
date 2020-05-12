import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeCreateEditView from "../RecipeCreateEditView";
import { RecipeContext } from "../../context/recipeContext";

beforeAll(() => {
  recipes = [{ name: "Pizza" }];
});

it("should render ListView", () => {
  const { getByTestId } = render(
    <RecipeContext.Provider value={{ recipes }}>
      <RecipeCreateEditView route={{ name: "New Recipe" }} />
    </RecipeContext.Provider>
  );
  const node = getByTestId("createEditView");
  expect(node).toBeDefined();
});

it.skip("should create new Recipe", () => {});

//check if it is added to the list - it is created
