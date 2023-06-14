const Util = (function() {
  /**
   * @param {Array} array 
   * @returns Random item from the array passed as the only parameter.
   */
  function arraySample() {
    const index = Math.floor(Math.random() * array.length);

    return array[index];
  }


  function randint(max, min=0) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  const capitalize = str => (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );


  const generateIndex = (function() {
    let index = 0;
    return function() {index += 1; return index;}
  })()



  function isKeyNumeric(keyCode) {
    if ( 
      keyCode === 8  || // Backspace
      keyCode === 9  || // Tab
      keyCode === 46 || // Delete
      (keyCode >= 48 && keyCode <= 57 ) || // Numeric keys on top of the keyboard
      (keyCode >= 96 && keyCode <= 105)    // Numeric keys on the numpad
    ) return true;

    return false;
  }

  


  return {
    arraySample  : arraySample,
    capitalize   : capitalize,
    generateIndex: generateIndex,
    isKeyNumeric : isKeyNumeric,
    randint      : randint
  }

})()

export default Util;