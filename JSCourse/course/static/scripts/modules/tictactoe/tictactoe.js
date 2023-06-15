import Util      from "../../Utilities/util.js";

import Game      from "./Models/game.js";
import Player    from "./Models/player.js";
import Gameboard from "./Models/gameboard.js";

import View      from "./Views/view.js";


const TicTacToe = (function() {
  function run() {
    View.show('launcher');
    View.Launcher.form.onsubmit = handlers.startGame;
    _setHandlers();
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

    _startGame();
    Gameboard.reset();
    
    View.startGame(handlers);
  }

  /**
   *  Handles HUMAN users' clicks on the cells in the gameboard.
   * 
   */
  function _handleClickCell(event) {
    event.stopPropagation();

    const alignment = event.target.dataset.Id;
    const player    = Game.getState().current;

    if ( !(_isClickLegal(player, alignment))) return;
    
    _updateGameboard(alignment, player);
  }


    function _isClickLegal(player, alignment) {
    if (Game     .getState().over          ||
      !(player   .isHuman())               ||
        Gameboard.isCellOccupied(alignment)
      ) return false;
    return true;
  }


  function _startGame() { 
    const newGameData = new FormData(View.Launcher.form);


    Game.setPlayers(
      _createPlayer(1, newGameData),
      _createPlayer(2, newGameData)
    );

    Game.nextTurn();
  }


  function _setHandlers() {
    Game.setHandlers(handlers);
    View.setHandlers(handlers);
  }

  function _createPlayer(id, gameData) {
    const attributes = ['name', 'symbol', 'color', 'type'];
    
    return Player(
      id,
      ...attributes.map(attr => (
        gameData.get(`player-${id}-${attr}`)
      )),      
    )
  }


  function _updateGameboard(alignment, owner) {
    Gameboard.setOwnership(alignment, owner);
    Game.nextTurn();
    View.update();
    
    Game.setWinner(Gameboard.findWinner());
    
    if (Game.getState().over || Gameboard.allCellsOccupied()) {
      // Delay finishing the game to allow the last clicked cell show its owner.
      setTimeout(() => _finishGame(), 1000);
    } 
  }




  function _finishGame() {
    const winner = Game.getState().winner;
    winner ? winner.win() : Game.draw();

    View.update();
    View.showSummary();
  }




  function _reset(){
    Game.reset();
    Gameboard.reset();

    View.update();
  }


  function _handleRestart() {
    View.show('launcher');
  }

  function _handleNextRound() {
    View.show('game');
    _reset();
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
      
      _updateGameboard(chosenCell, player);
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

    setTimeout(() => _updateGameboard(chosenCell, player), 1000);
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