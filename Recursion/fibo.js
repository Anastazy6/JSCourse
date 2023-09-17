const Fibonacci = (function() {

  function iterative (length) {
    let temp;
    let first  = 0;
    let second = 1;

    let result = [first, second];
    if (length < 3) return result.slice(0, length);

    for (let i = 2; i < length; i++) {
      temp = first + second;
      result.push(temp);
      first = second;
      second = temp;
    }

    return result
  }


  function recursive (length, array=[], index=0) {
    console.log(length, index, array);
    if (index === length) return array;
    if (index === 0)      return recursive(length, [0],    index + 1);
    if (index === 1)      return recursive(length, [0, 1], index + 1);

    let next = array.at(-1) + array.at(-2);
    array.push(next);

    return recursive(length, array, index + 1);
  }

  return {
    iterative,
    recursive
  }
})()

module.exports = Fibonacci;
