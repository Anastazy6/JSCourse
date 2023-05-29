import View from "./View.js";
import Path from "./Path.js";

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

  return {
    capitalize   : capitalize,
    generateIndex: generateIndex,
    getCookie    : getCookie,

    Path         : Path,
    View         : View
  }

})()

export default Util;