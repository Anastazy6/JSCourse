/** 
 * Namespace for View utilities and common methods for Views.
 */
const ViewUtils = (function() {
  function show(element, type='block') {
    element.style.display = type;
  }

  function hide(element) {
    element.style.display = "none";
  }


  return {
    show: show,
    hide: hide
  }
})()

export default ViewUtils;