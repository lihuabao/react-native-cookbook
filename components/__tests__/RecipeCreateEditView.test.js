import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeCreateEditView from "../RecipeCreateEditView";
import { RecipeContext } from "../../context/recipeContext";

let viewComponent;

beforeAll(() => {
  recipes = [{ name: "Pizza" }];
  updatedRecipes = [{ name: "Pizza" }, { name: "Ramen" }];
  dispatch = () => jest.fn();
  viewComponent = (
    <RecipeContext.Provider value={{ recipes, dispatch }}>
      <RecipeCreateEditView
        route={{ name: "New Recipe" }}
        navigation={{ goBack: jest.fn() }}
      />
    </RecipeContext.Provider>
  );
});

it("should render the create/edit form", () => {
  const { getByTestId } = render(viewComponent);
  const node = getByTestId("createEditView");

  expect(node).toBeDefined();
});

it("should create and save new recipe", () => {
  const { getByTestId } = render(viewComponent);

  const input = getByTestId("nameInput");
  fireEvent.changeText(input, "ramen");

  const button = getByTestId("saveBtn");
  fireEvent.press(button);

  //check if it is added to the list - it is created
});
