const reverse = require("./reverse");

describe("It reverses a string", () => {
  test("Keeps a single char unmodified", () => {
    expect(reverse('a')).toBe('a');
  })

  test("Reverses a lowercase word", () => {
    expect(reverse("marwolaeth")).toBe('htealowram');
  })

  test("Does not break palindromes", () => {
    expect(reverse("abcba")).toBe("abcba");
  })

  test("Deals with mixed case strings", () => {
    expect(reverse("aBcD e Fg")).toBe("gF e DcBa");
  });

  test("Deals with number characters", () => {
    expect(reverse("69 nice")).toBe("ecin 96");
  });

  test("Deals with all kinds of characters", () => {
    expect(reverse("It's 4:20 o'clock, my dudes! #weed"))
    .toBe("deew# !sedud ym ,kcolc'o 02:4 s'tI");
  });
})