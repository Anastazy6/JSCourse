const Calculator = require('./calculator');

// This is definitely excessive for what it is testing, but since it's just for
//   practicing unit tests...
describe("It performs four basic operations", () => {
  describe("It can add two numbers", () => {
    test("Properly adds two zeros", () => {
      expect(Calculator.add(0, 0)).toBe(0);
    })

    test("Adds zero to a number", () => {
      expect(Calculator.add(666, 0)).toBe(666);
    })

    test("Adds two positive numbers", () => {
      expect(Calculator.add(21, 37)).toBe(58);
    })

    test("Adds a negative number to a positive number", () => {
      expect(Calculator.add(-21, 37)).toBe(16);
    })

    test( "Adds a negative number to a positive number, " +
          "but the negative's absolute value is bigger", () => {
      expect(Calculator.add(21, -37)).toBe(-16);
    });

    test("Adds two negative numbers", () => {
      expect(Calculator.add(-21, -37)).toBe(-58);
    })

    test("Works with floats", () => {
      expect(Calculator.add(21.37, 1.1)).toBeCloseTo(22.47);
    })
  });

  describe("It can subtract a number from another number", () => {
    test("Subtracts 0 from a number", () => {
      expect(Calculator.subtract(10, 0)).toBe(10);
    });

    test("Subtracts smaller positive number", () => {
      expect(Calculator.subtract(37, 21)).toBe(16);
    });

    test("Subtracts bigger positive number", () => {
      expect(Calculator.subtract(21, 37)).toBe(-16);
    });

    test("Subtracts negative number from a positive one", () => {
      expect(Calculator.subtract(21 ,-37)).toBe(58);
    });

    test( "Subtracts absolutely smaller negative number " +
          "from another negative number", () => {
      expect(Calculator.subtract(-37, -21)).toBe(-16);
    });

    test( "Subtracts absolutely larger negative number " +
          "from another negative number", () => {
      expect(Calculator.subtract(-21, -37)).toBe(16);
    });

    test("Works with floats", () => {
      expect(Calculator.subtract(21.37, 1.36)).toBeCloseTo(20.01);
    })
  });

  describe("It can multiply two numbers", () => {
    test("Multiplies by zero", () => {
      expect(Calculator.multiply(123, 0)).toBe(0);
    });

    test("Multiplies by 1", () => {
      expect(Calculator.multiply(5, 1)).toBe(5);
    });

    test("Multiplies two positive integers", () => {
      expect(Calculator.multiply(2, 3)).toBe(6);
    });

    test("Multiplies a positive number by a negative one", () => {
      expect(Calculator.multiply(3, -2)).toBe(-6);
    });

    test("Multiplies two negative integers", () => {
      expect(Calculator.multiply(-3, -4)).toBe(12);
    });

    test("Works with floats", () => {
      expect(Calculator.multiply(2.5, 2.5)).toBeCloseTo(6.25);
    });
  });


  describe("It can divide one number by another number", () => {
    test("It divides by 1", () => {
      expect(Calculator.divide(5, 1)).toBe(5);
    });

    test("Divides bigger int by smaller int, where the result is an integer", () => {
      expect(Calculator.divide(4, 2)).toBe(2);
    });

    test("Divides smaller int by bigger int, so that the result cannot be an integer", () => {
      expect(Calculator.divide(2, 4)).toBeCloseTo(0.5);
    });

    test("Divides a positive number by a negative one", () => {
      expect(Calculator.divide(4, -2)).toBe(-2);
    });

    test("Divides a negative number by a positive one", () => {
      expect(Calculator.divide(-4, 2)).toBe(-2);
    });

    test("Divides a negative number by a negative one", () => {
      expect(Calculator.divide(-4, -2)).toBe(2);
    });

    test("Works with floats in parametres", () => {
      expect(Calculator.divide(6.25, 2.5)).toBeCloseTo(2.5);
    });

    test("It's JavaScript so it can divide by 0 for some reason...", () => {
      expect(Calculator.divide(4, 0)).toBe(Infinity);
    });
  });


  describe("It overrides JavaScript's ability do divide by zero if asked to", () => {
    test("Legal division works correctly when using the safe method", () => {
      expect(Calculator.properDivide(4, 2)).toBe(2);
    });

    test("It throws an error when dividing by zero using the safe method", () => {
      expect(() => Calculator.properDivide(4, 0)).toThrow("Zero division error");
    });
  });
});