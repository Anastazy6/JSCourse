// import Util from "../../Utilities/util.js";

import Game  from "./Models/game.js";
import View  from "./Views/view.js";

import UnbeatableAI from "./AI/unbeatable.js";
import RandomAI     from "./AI/random.js";




const TicTacToe = (function() {
  function run() {
    [Game, View].map(module => module.setHandlers(handlers));
    View.show('launcher');
  }


  const handlers = {
    clickCell  : _handleClickCell,
    nextRound  : _handleNextRound,
    restart    : _handleRestart,
    startGame  : _handleStartGame,
    
    pickOptimal: () => _handleAIMove(UnbeatableAI),
    pickRandom : () => _handleAIMove(RandomAI),
  }


  function _handleStartGame(event) {
    event.preventDefault();
    const newGameData = new FormData(View.Launcher.form);
    
    Game .startNewGame(newGameData);
    View .startGame();
  }

  /**
   *  Handles HUMAN users' clicks on the cells in the Board.
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
      const state = Game.getState();

    if (state.over        ||
      !(player.isHuman()) ||
        state.board.isCellOccupied(cell)
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


  function _handleAIMove(AIModule) {
    const player     = Game.getState().current;
    const chosenCell = AIModule.move(player);

    console.log(chosenCell);

    setTimeout(() => _performMove(chosenCell, player), 666);
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