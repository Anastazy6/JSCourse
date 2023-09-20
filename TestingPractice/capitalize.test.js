const capitalize = require("./capitalize");

describe("Capitalizes the first letter in a string", () => {
  test("Capitalizes a single lowercase letter", () => {
    expect(capitalize('a')).toBe('A');
  });

  test("Does not decapitalize a single uppercase letter", () => {
    expect(capitalize('A')).toBe('A');
  });

  test("Capitalizes the first letter in an all lowercase string", () => {
    expect(capitalize('marwolaeth a dinistrio')).toBe('Marwolaeth a dinistrio');
  });

  test("Does not break an already properly capitalized string", () => {
    let string = "Marwolaeth a dinistrio";
    expect(capitalize(string)).toBe(string);
  });

  test("Reverses capitalization of an evil-capitalized string", () => {
    expect(capitalize('mARWOLAETH A DINISTRIO')).toBe("Marwolaeth a dinistrio");
  });

  test("Deals with an utter madness of a string", () => {
    expect(capitalize('mArWoLAEtH a DINistRIo')).toBe("Marwolaeth a dinistrio");
  });
})