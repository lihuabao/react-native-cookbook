import { lettersOnly, numbersOnly } from "./helpers";

describe("lettersOnly", () => {
  test("returns a string to only contain letters", () => {
    const withNumbers = "asd9090";

    expect(lettersOnly(withNumbers)).toBe("asd");
  });
});

describe("numbersOnly", () => {
  test("returns a boolean if input string has only numbers or not", () => {
    const withLettersAndNumbers = "asd9090";
    const withNumbersOnly = "098098";

    expect(numbersOnly(withLettersAndNumbers)).toBeFalsy();
    expect(numbersOnly(withNumbersOnly)).toBeFalsy();
  });
});
