export const lettersOnly = (text: string): string =>
  text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");

export const numbersOnly = (input: string): boolean => {
  const regex = RegExp(/^[1-9][0-9]*$/);
  return regex.test(input);
};
