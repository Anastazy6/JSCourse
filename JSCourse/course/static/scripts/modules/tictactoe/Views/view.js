import Gameboard from "./gameboard.js";
import Launcher  from "./launcher.js";
import State     from "./state.js";


const View = (function() {

  /**
   *  TODO: 
   *    develop the app sufficiently to determine whether the summary part
   *    is going to be used (and move it to its own namespace) or delete
   *    it altogether including its HTML template part.
   */   
  const summary = document.getElementById('summary');


  return {
    Gameboard: Gameboard,
    Launcher : Launcher,
    State    : State
  }
})()

export default View;