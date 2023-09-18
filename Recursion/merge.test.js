const mergeSort = require("./merge");

describe("Sorts an array of numbers", () => {
  test("Sorts an empty array", () => {
    let result = mergeSort([]);
    expect(result).toEqual([]);
  })

  test("Sorts an array with 1 element", () => {
    let result = mergeSort([1]);
    expect(result).toEqual([1]);
  })

  test("Sorts an array with 2 elements,", () => {
    let result = mergeSort([2, 1]);
    expect(result).toEqual([1, 2]);
  })

  test("Sorts an array with a number of elements being a power of 2", () => {
    let result = mergeSort([3, 1, 2, 7, 8, 5, 4, 6]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  })

  test("Sorts an array with a number of elements leading to shorter subarrays", () => {
    let result = mergeSort([6, 4, 7, 3, 2, 1, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  })

  test("Sorts an already sorted array without messing up things", () => {
    let result = mergeSort([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  })
})
