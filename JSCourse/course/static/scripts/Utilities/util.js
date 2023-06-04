import View from "./viewUtils.js";
import Path from "./pathUtils.js";

const Util = (function() {

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  
  const generateIndex = (function() {
    let index = 0;
    return function() {index += 1; return index;}
  })()

  /**
   * Source: https://stackoverflow.com/a/50735730
   * @param {*} name 
   * @returns Cookie value
   */
  const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }


  const isKeyNumeric = keyCode => {
    if ( 
      !(
        keyCode === 8 || // Backspace
        keyCode === 9 || // Tab
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
    getCookie    : getCookie,
    isKeyNumeric : isKeyNumeric,
  }

})()

export default Util;