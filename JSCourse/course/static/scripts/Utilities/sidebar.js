import ViewUtils from "./viewUtils.js";


/**
 * Governs the style of the sidebars and body depending on their contents.
 * Responsible for hiding the sidebars if they're empty, regardless of screen
 * width and other rules written in the stylesheet.
 */
const Sidebar = (function() {
  const body     = document.querySelector ('body'            );
  const leftBar  = document.getElementById('body-left-panel' );
  const rightBar = document.getElementById('body-right-panel');


  
  function render() {
    _hideIfEmpty(leftBar );
    _hideIfEmpty(rightBar);
    _setBodyStyle()
  }


  const _sidebarHidden = sidebar => sidebar.style.display === 'none';

  const _noSidebarVisible = () => _sidebarHidden(leftBar) && _sidebarHidden(rightBar);

  function _hideIfEmpty(sidebar) {
    if (sidebar.innerHTML.trim() === '') ViewUtils.hide(sidebar);

    // Otherwise use style defined in the stylesheet.
  }

  function _setBodyStyle() {
    if (_noSidebarVisible()) body.style.display = 'contents';

    // Otherwise use style defined in the stylesheet.
  }

  

  return {
    render: render
  }
})()

export default Sidebar;