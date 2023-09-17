// Excercises from: https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion

function sumRange(number) {
  return (number <= 1 ? number : number + sumRange(number - 1));
}

function power(base, exponent) {
  return exponent === 0 ? 1 : base * power(base, exponent - 1);
}

function factorial(number) {
  return number === 0 ? 1 : number * factorial(number - 1);
}

function all(array, callback) {
  if (!(callback(array[0]))) return false;

  if (array.length === 1) return true;

  return all(array.slice(1), callback);
}


function productOfArray(nums) {
  return nums.length === 1 ? nums[0] : nums[0] * productOfArray(nums.slice(1));
}


function contains(obj, item) {
  // Object.keys(obj).map(key => {...}) didn't work. Might need to investigate further
  for(let key in obj) {
    if (typeof obj[key] === 'object') {
      return contains(obj[key], item);
    }

    if (obj[key] === item) return true;
  }

  return false;
}


function countIntegers(array) {
  let counter = 0;

  for(let i in array) {
    if (Array .isArray  (array[i])) counter += countIntegers(array[i]);
    if (Number.isInteger(array[i])) counter++;
  }
  return counter;
}


function sumSquares(list) {
  let result = 0;

  if (list.length === 0) return 0;

  let last = list.pop();

  if (Array.isArray(last)) result += sumSquares(last);
  if (typeof last === 'number') result += (last * last);
  result += sumSquares(list);

  return result;
}

function replicate(times, value, state=[]) {
  if (times <= 0) return state;
  
  state.push(value);
  return replicate(times - 1, value, state);
}

console.log(replicate(3, 5)) // [5, 5, 5]
console.log(replicate(1, 69)) // [69]
console.log(replicate(-2, 6)) // []


// let l = [1,2,3]; 
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

// l = [[1,2],3]; 
// console.log(sumSquares(l)); // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]] 
// console.log(sumSquares(l)); // 1 = 1

// l = [10,[[10],10],[10]] 
// console.log(sumSquares(l)); // 100 + 100 + 100 + 100 = 400



// let seven = countIntegers([[[5], 3], 0, 2, ['foo'], [], [4, [5, 6]]]); // 7
// console.log(seven);

// const nestedObject = {
//   data: {
//       info: {
//           stuff: {
//               thing: {
//                   moreStuff: {
//                       magicNumber: 44,
//                       something: 'foo2'
//                   }
//               }
//           }
//       }
//   }
// }

// let hasIt = contains(nestedObject, 44); // true
// let doesntHaveIt = contains(nestedObject, "foo"); // false

// console.log(`Has it: ${hasIt}\nDoesn't have it: ${doesntHaveIt}`);


// for (let i = 0; i <= 10; i++) {
//   //console.log(sumRange(i));
//   //console.log(power(2, i));
//   //console.log(factorial(i));
// }

// const allAreLessThanSeven = all([2, 1, 3, 7], x => x < 7);
// const allAreLessThanEight = all([2, 1, 3, 7], x => x < 8);

// //console.log(`All < 7: ${allAreLessThanSeven}`);
// //console.log(`All < 8: ${allAreLessThanEight}`);

// console.log(productOfArray([1,2,3]))   // 6
// console.log(productOfArray([1,2,3]))   // 60
// console.log(productOfArray([2,1,3,7])) // 42 