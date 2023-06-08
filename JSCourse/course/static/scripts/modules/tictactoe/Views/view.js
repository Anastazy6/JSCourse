import Gameboard from "./gameboard.js";
import Launcher  from "./launcher.js";
import State     from "./state.js";


const View = (function() {
  const summary = document.getElementById('summary');


  return {
    Gameboard: Gameboard,
    Launcher : Launcher,
    State    : State
  }
})()

export default View;