import Util      from "../../Utilities/util.js";

import Game      from "./Models/game.js";
import Gameboard from "./Models/gameboard.js";

import View      from "./Views/view.js";


const TicTacToe = (function() {
  function run() {
    [Game, View].map(module => module.setHandlers(handlers));
    View.show('launcher');
  }


  const handlers = {
    clickCell  : _handleClickCell,
    nextRound  : _handleNextRound,
    pickOptimal: _handlePickOptimal,
    pickRandom : _handlePickRandom,
    restart    : _handleRestart,
    startGame  : _handleStartGame,
    
  }


  function _handleStartGame(event) {
    event.preventDefault();

    const newGameData = new FormData(View.Launcher.form);

    Game.startNewGame(newGameData);
    Gameboard.reset();
    
    View.startGame();
  }

  /**
   *  Handles HUMAN users' clicks on the cells in the gameboard.
   * 
   */
  function _handleClickCell(event) {
    event.stopPropagation();

    const cell   = event.target.dataset.Id;
    const player = Game.getState().current;

    if ( !(_isClickLegal(cell, player))) return;
    
    _performMove(cell, player);
  }


    function _isClickLegal(cell, player) {
    if (Game     .getState().over          ||
      !(player   .isHuman())               ||
        Gameboard.isCellOccupied(cell)
      ) return false;
    return true;
  }



  function _performMove(cell, player) {
    Game.registerMove(cell, player);
    Game.nextTurn();
    View.update();
    
    if (Game.getState().over) {
      // Delay finishing the game to allow the last clicked cell show its owner.
      setTimeout(() => View.showSummary(), 1000);
    } 
  }


  function _handleRestart() {
    View.show('launcher');
  }

  function _handleNextRound() {
    Game.startNewRound();
    View.show('game');    
    View.update();
  }


  function _handlePickRandom() {
    const player = Game.getState().current;

    // Ensure this function is only available to the random AI player.
    if ( !(player.isRandomAI()) ) {
      throw "Only random AI player may use this function."; 
    }

    setTimeout(() => {
      const legalCells = Gameboard.getEmptyCells();
      const chosenCell = Util.arraySample(legalCells);
      
      _performMove(chosenCell, player);
    }, 1000)
  }


  function _handlePickOptimal() {
    const player = Game.getState().current;

    // Ensure this function is only available to the unbeatable AI player.
    if ( !(player.isUnbeatableAI()) ) {
      throw "Only unbeatable AI player may use this function."; 
    }

    // TODO: write algorithm for the unbeatable AI player.

    // Temporary solution (unbeatable AI picks random legal cells)
    const legalCells = Gameboard.getEmptyCells();
    const chosenCell = Util.arraySample(legalCells);

    setTimeout(() => _performMove(chosenCell, player), 1000);
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