const caesar = require('./caesar');

describe("It encodes a string using the caesar cipher", () => {
  describe("It works with the English alphabeth by default", () => {
    test("It changes a single letter", () => {
      expect(caesar.caesar('a', 1)).toBe('b');
    });

    test("It does not change anything when the offset is 0", () => {
      expect(caesar.caesar('test', 0)).toBe('test');
    });

    test("It encodes an all-lowercase string without wrapping", () => {
      expect(caesar.caesar('abcde', 2)).toBe('cdefg');
    });

    test("It keeps the case", () => {
      expect(caesar.caesar('aBcDe', 2)).toBe('cDeFg');
    });

    test("It ignores special characters", () => {
      expect(caesar.caesar('abcde! @#$%,.;[]"', 2)).toBe('cdefg! @#$%,.;[]"');
    });

    test( "It wraps the key if the offset is above 25, " +
          "doing nothing if (key % 26 === 0)", () => {
      expect(caesar.caesar('abcde', 26)).toBe('abcde');
    });

    test( "It wraps the key if the offset is above 25, " +
          "using (mod 26) as the offset", () => {
      expect(caesar.caesar('abcde', 28)).toBe('cdefg');
    });
  }); 

  describe("It works with other alphabeths if they are provided as a key", () => {
    let key = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż"; // Polish alphabeth, 32 characters
    
    test("It changes a single letter according to the specified key", () => {
      expect(caesar.caesar('a', 1, key)).toBe('ą');
    });

    test("It works with larger strings", () => {
      expect(caesar.caesar("zażółć GĘŚLĄ jaźń", 2, key)).toBe('żbąrne IGUMC lbaó');
    });

    test("It correctly works with all letters of the key", () => {
      let text     = "Aj, pech! Struś dźgnął ćmę FBI! Koń lży wóz." // Don't ask...
      let expected = "Ąk, ręći! Śuswt eżhńbm dnf GCJ! Lóo łaz ypź." // Makes just a little less sense and I'm a native speaker...
      expect(caesar.caesar(text, 1, key)).toBe(expected);
    });

    test( "It wraps the key if the offset is higher than the length of the key, " +
          "no matter the length of the key", () => {
      expect(caesar.caesar("zażółć GĘŚLĄ jaźń", 34, key)).toBe('żbąrne IGUMC lbaó');
    });
  });

  describe("It works with truly custom keys", () => {
    test("It does not change characters which aren't a part of the key", () => {
      expect(caesar.caesar('test', 2, '!@#$%^')).toBe('test');
    });

    test("It changes special characters which are a part of the key", () => {
      expect(caesar.caesar('test!@#abcD', 2, '!a@b$d')).toBe('test@$#bdcA');
    });

    test("It throws an error if key has duplicate characters", () => {
      expect(() => caesar.caesar('test', 2, 'aabcde')).toThrow("Duplicate characters in key");
    });

    // Ensures that the key, despite being able to use different kinds of characters 
    //   (letters, numbers, special chars), is case insensitive
    test("It throws an error even if the duplicate characters are of different case", () => {
      expect(() => caesar.caesar('test', 2, 'aAbcde')).toThrow("Duplicate characters in key");
    });
  });
});

describe("It creates encoding table", () => {
  test("It creates a table with no offset", () => {
    let table = { a: 'a', b: 'b', c: 'c', d: 'd' };
    expect(caesar.createTable(0, 'abcd')).toEqual(table);
  });

  test("It creates a table with offset smaller than the key's length", () => {
    let table = { a: 'b', b: 'c', c: 'd', d: 'a' };
    expect(caesar.createTable(1, 'abcd')).toEqual(table);
  });

  test("It creates a table with offset greater than the key's length", () => {
    let table = { a: 'b', b: 'c', c: 'd', d: 'a' };
    expect(caesar.createTable(5, 'abcd')).toEqual(table);
  })

  test("It is case insensitive (upper case letters are converted to lower case)", () => {
    let table = { a: 'a', b: 'b', c: 'c', d: 'd' };
    expect(caesar.createTable(0, 'aBCd')).toEqual(table);
  });
});