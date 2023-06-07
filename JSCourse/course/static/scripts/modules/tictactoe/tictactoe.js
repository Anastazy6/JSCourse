// import Util from "../../util/util.js";
import Player    from "./Models/player.js";
import View      from "./Views/view.js";
import Gameboard from "./Models/gameboard.js";

const TicTacToe = (function() {
  function run() {
    View.Launcher.form.onsubmit = _handleStartGame;
  }


  function _handleStartGame(event) {
    event.preventDefault();

    const newGameData = new FormData(View.Launcher.form);
    
    _startGame(newGameData);

    Gameboard.reset();
    View.Gameboard.update(Gameboard.getState());
  }

  function _startGame(gameData) { 
    const player1 = _createPlayer(gameData, 1);
    const player2 = _createPlayer(gameData, 2);

    console.log(player1.to_s());
    console.log(player2.to_s());
  }

  function _createPlayer(gameData, playerID) {
    return Player(
      gameData.get(`player-${playerID}-name`  ),
      gameData.get(`player-${playerID}-symbol`),
      gameData.get(`player-${playerID}-color` ),
      gameData.get(`player-${playerID}-type`  )
    )
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