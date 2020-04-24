export const lettersOnly = (text) =>
  text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");

export const numbersOnly = (input) => {
  const regex = RegExp(/^[1-9][0-9]*$/);
  return regex.test(input);
};
