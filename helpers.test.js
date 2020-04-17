import { parseStringToArray } from "./helpers.js";

describe("", () => {
  test("parseStringToArray", () => {
    const string = "a\nb\nc";
    const array = ["a", "b", "c"];

    expect(parseStringToArray(string)).toEqual(array);
  });
});
