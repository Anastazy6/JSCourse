const Fibonacci = require("./fibo");

// function arrayComp (arr1, arr2) {
//   if (arr1.length !== arr2.length) return false;

//   for(let i = 0; i < arr1.length; i++) {
//     if (arr1[i] !== arr2[i]) return false;
//   }

//   return true;
// }

describe('Create an array of x first Fibonacci numbers iteratively', () => { 
  test('0 first Fibonacci numbers to be an empty array', () => {
    expect(Fibonacci.iterative(0)).toEqual([]);
  });

  test('displays the very first Fibonacci number', () => {
    let result = Fibonacci.iterative(1);
    expect(result).toEqual([0]);
  });

  test('displays the first two Fibonacci numbers',() => {
    let result = Fibonacci.iterative(2);
    expect(result).toEqual([0, 1]);
  });

  test('generates an array of the 8 first Fibonacci numbers', () => {
    let result = Fibonacci.iterative(8);
    let target = [0, 1, 1, 2, 3, 5, 8, 13];
    expect(result).toEqual(target);
  });
})

describe('Create an array of x first Fibonacci numbers recursively', () => { 
  test('0 first Fibonacci numbers to be an empty array', () => {
    expect(Fibonacci.recursive(0)).toEqual([]);
  });

  test('displays the very first Fibonacci number', () => {
    let result = Fibonacci.recursive(1);
    expect(result).toEqual([0]);
  });

  test('displays the first two Fibonacci numbers',() => {
    let result = Fibonacci.recursive(2);
    expect(result).toEqual([0, 1]);
  });

  test('generates an array of the 8 first Fibonacci numbers', () => {
    let result = Fibonacci.recursive(8);
    let target = [0, 1, 1, 2, 3, 5, 8, 13];
    console.log(result);
    expect(result).toEqual(target);
  });
})