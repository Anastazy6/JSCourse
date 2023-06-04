// import Util from "../../util/util.js";
import Player    from "./player.js";
import View      from "./view.js";
import Gameboard from "./gameboard.js";

const TicTacToe = (function() {
  function run() {
    console.log("Kółko i krzyżyk");
    View.launcherForm.onsubmit = _handleStartGame;
  }


  function _handleStartGame(event) {
    event.preventDefault();

    console.log("Game started, functionality not yet implemented");
  }

  
  return {
    run: run
  }
})()


/** 
 * Allows dynamically importing the module and running it like this:
 * 
 *   import("path/to/this/module") 
 * 
 *   .then(module => module.default()) 
 * 
 *   .catch([error handling goes here]) // optional line
 */
const App = () => {
  TicTacToe.run()
}

export default App;