/** 
 * Namespace for View utilities and common methods for Views.
 */
const ViewUtils = (function() {
  function applyCSS(element, styles) {
    Object.keys(styles).map(prop => element.style[prop]  = styles[prop]);

    return element;
  }


  function show(element, type='block') {
    element.style.display = type;
  }


  function hide(element) {
    element.style.display = "none";
  }



  return {
    applyCSS: applyCSS,
    show    : show,
    hide    : hide
  }
})()



export default ViewUtils;