import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeDetailView from "../RecipeDetailView";
import { RecipeContext } from "../../context/recipeContext";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: "",
}));

beforeAll(() => {
  const setOptions = jest.fn();
  navigation = { setOptions };
  recipes = [
    {
      id: 1,
      name: "pizza",
      ingredients: [{ name: "milk", qty: "250 ml" }],
      steps: ["wash", "cut", "cook"],
    },
  ];
  route = { params: { item: { id: 1 } } };
});

it("should render", () => {
  const { getByTestId } = render(
    <RecipeContext.Provider value={{ recipes }}>
      <RecipeDetailView navigation={navigation} route={route} />
    </RecipeContext.Provider>
  );

  expect(getByTestId("detailView")).toBeDefined();
});

describe.skip("when pressing the delete button", () => {
  it("should open the alert window with options to delete or cancel", () => {
    const { getByTestId, getByText } = render(
      <RecipeContext.Provider value={{ recipes }}>
        <RecipeDetailView navigation={navigation} route={route} />
      </RecipeContext.Provider>
    );
    fireEvent(getByTestId("deleteBtn"), "onPress");
  });
});
