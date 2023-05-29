/** 
 * Namespace for View utilities and common methods for Views.
 */
const View = (function() {
  function show(element, type='block') {
    element.style.display = 'grid';
  }

  function hide(element) {
    element.style.display = "none";
  }


  return {
    show: show,
    hide: hide
  }
})()

export default View;