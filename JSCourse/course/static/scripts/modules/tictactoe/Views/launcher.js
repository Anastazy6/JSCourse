/**
 * Namespace for the launcher part of the view, especially the launcher form.
 */
const Launcher = (function() {
  const wrapper = document.getElementById('launcher'     );
  const form    = document.getElementById('launcher-form');


  return {
    wrapper: wrapper,
    form   : form
  }
})()

export default Launcher;