import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import RecipeItem from "../RecipeItem";

it("should render", () => {
  const { getAllByTestId } = render(<RecipeItem />);
  const node = getAllByTestId("recipeItemBtn");

  expect(node).toHaveLength(1);
});

it("should navigate to detailView when pressed", () => {
  const navigateToDetailView = jest.fn();
  const { getByTestId } = render(<RecipeItem onPress={navigateToDetailView} />);

  fireEvent(getByTestId("recipeItemBtn"), "onPress");

  expect(navigateToDetailView).toHaveBeenCalledTimes(1);
});
