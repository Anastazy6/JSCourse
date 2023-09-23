const analyzeArrayPack = require('./analyze-array');

const analyzeArray = analyzeArrayPack.analyzeArray;
const analyseArray = analyzeArrayPack.analyseArray;


describe("It analyses an array", () => {
  const testObject = analyzeArray([1,8,3,4,2,6]);
  
  test( "It returns an object with the following properties: " +
        "average, min, max, length", () => {
    
    let keys = ['average', 'min', 'max', 'length'];
    expect(Object.keys(testObject)).toEqual(keys);
  });

  test("It calculates the averages of the mumbers in the array", () => {
    expect(testObject['average']).toEqual(4);
  });

  test("It gets the smallest number in the array", () => {
    expect(testObject['min']).toEqual(1);
  });

  test("It gets the biggest number in the array", () => {
    expect(testObject['max']).toEqual(8);
  });

  test("It gets the length of the array", () => {
    expect(testObject['length']).toEqual(6);
  });

  test("It requires the array to only contain numbers", () => {
    expect(() => analyzeArray([1, 2, 3, 'a', 'b', {a: 5}])).toThrow(
      "The numbers array must only contain numbers"
    );
  });

  test("It throws an error when the numbers array is empty", () => {
    expect(() => analyzeArray([])).toThrow("Can't analyze an empty array");
  });

  test("It requires the argument to be a an array", () => {
    let testArgs = [
      1,
      'string',
      {a: 1},
      null,
      false,
      true,
    ];

    testArgs.forEach(arg => 
      expect(() => analyzeArray(arg)).toThrow("Can only analyze arrays")
    );
  });

  test("It requires the numbers array to be flat (i.e. no nesting", () => {
    let testArray = [1, 2, 3, [4, 5, [6, 7], 8], 9];

    expect(() => analyzeArray(testArray)).toThrow(
      "Nested arrays are not allowed"
    );
  });
});

describe("It supports British English spelling", () => {
  test("It does everything it should when called as analyseArray", () => {
    let expected = {
      average: 4,
      min    : 1,
      max    : 8,
      length : 6
    };
    expect(analyseArray([1, 8, 3, 4, 2, 6])).toEqual(expected);
  });
});