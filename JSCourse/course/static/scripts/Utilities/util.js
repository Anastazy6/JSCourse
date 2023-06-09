const Util = (function() {

  const capitalize = str => (
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  );


  const generateIndex = (function() {
    let index = 0;
    return function() {index += 1; return index;}
  })()



  const isKeyNumeric = keyCode => {
    if ( 
      !(
        keyCode === 8  || // Backspace
        keyCode === 9  || // Tab
        keyCode === 46 || // Delete
        (keyCode >= 48 && keyCode <= 57 ) || // Numeric keys on top of the keyboard
        (keyCode >= 96 && keyCode <= 105)    // Numeric keys on the numpad
      )
    ) {
      return false;
    }
    return true;
  }

  
  return {
    capitalize   : capitalize,
    generateIndex: generateIndex,
    isKeyNumeric : isKeyNumeric,
  }

})()

export default Util;