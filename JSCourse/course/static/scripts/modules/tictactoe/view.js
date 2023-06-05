const View = (function() {
  const launcher     = document.getElementById('launcher'     );
  const launcherForm = document.getElementById('launcher-form');
  const gameboard    = document.getElementById('gameboard'    );
  const summary      = document.getElementById('summary'      );
  
  
  return {
    gameboard   : gameboard,  
    launcherForm: launcherForm
  }
})()

export default View;