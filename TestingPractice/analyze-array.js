function analyzeArray (numbers) {
  assertCorrectDataType(numbers)

  return {
    average: getAverage(numbers),
    min    : getMin(numbers),
    max    : getMax(numbers),
    length : numbers.length
  }
}


function analyseArray (numbers) {
  return analyzeArray(numbers);
}


function assertCorrectDataType (numbers) {
  criminalizeNonArrays  (numbers);
  criminalizeNestedArray(numbers);
  criminalizeEmpryArrays(numbers);
  criminalizeNonNumbers (numbers);
}


function criminalizeNonArrays (numbers) {
  if (!(Array.isArray(numbers))) {
    throw "Can only analyze arrays";
  }
}

function criminalizeNonNumbers (numbers) {
  numbers.forEach(num => {
    if (typeof num !== 'number') {
      throw "The numbers array must only contain numbers";
    }
  });
}

function criminalizeEmpryArrays (numbers) {
  if (numbers.length === 0) {
    throw "Can't analyze an empty array";
  }
}


function criminalizeNestedArray (numbers) {
  numbers.forEach(item => {
    if (Array.isArray(item)) {
      throw "Nested arrays are not allowed";
    }
  });
}


function getAverage (numbers) {
  let sum = numbers.reduce((acc, current) => acc + current, 0);

  return sum / numbers.length;
}


function getMin (numbers) {
  let min = numbers[0];

  numbers.forEach(num => {
    if (num < min) min = num;
  });

  return min;
}


function getMax (numbers) {
  let max = numbers[0];

  numbers.forEach(num => {
    if (num > max) max = num;
  })

  return max;
}


module.exports = { analyzeArray, analyseArray }