const Calculator = (function() {
  function add (a, b) {
    return a + b;
  }

  function subtract (a, b) {
    return a - b;
  }

  function multiply (a, b) {
    return a * b;
  }

  function divide(a ,b) {
    return a / b;
  }

  function properDivide(a, b) {
    if (b === 0) {
      throw new Error("Zero division error");
    } else {
      return divide(a, b);
    }
  }

  return {
    add,
    subtract,
    multiply,
    divide,
    properDivide
  }

})()

module.exports = Calculator;