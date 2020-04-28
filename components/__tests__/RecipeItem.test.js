import React from "react";
import { render } from "react-native-testing-library";
import RecipeItem from "../RecipeItem";

it("should match the snapshot", () => {
  const { getAllByTestId } = render(<RecipeItem />);
  const element = getAllByTestId("recipeItem");

  expect(element).toHaveLength(1);
});
