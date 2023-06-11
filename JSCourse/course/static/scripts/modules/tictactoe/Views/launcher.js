/**
 * Namespace for the launcher part of the view, especially the launcher form.
 */
const Launcher = (function() {
  const container = document.getElementById('launcher'     );
  const form      = document.getElementById('launcher-form');


  return {
    container: container,
    form   : form
  }
})()

export default Launcher;