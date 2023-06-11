import Util      from "../../Utilities/util.js";

import Game      from "./Models/game.js";
import Player    from "./Models/player.js";
import Gameboard from "./Models/gameboard.js";

import View      from "./Views/view.js";


const TicTacToe = (function() {
  function run() {
    View.show('launcher');
    View.Launcher.form.onsubmit = handlers.startGame;
  }


  const handlers = {
    clickCell  : _handleClickCell,
    pickOptimal: _handlePickOptimal,
    pickRandom : _handlePickRandom,
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
    const player    = Game.getCurrentPlayer();

    if ( !(_isClickLegal(player, alignment))) return;
    
    _updateGameboard(alignment, player);
  }


    function _isClickLegal(player, alignment) {
    if (Game     .isOver()                 ||
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

    Game.nextTurn(handlers);
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
    Game.nextTurn(handlers);
    View.update(handlers);
    
    let winner = Gameboard.findWinner();
    
    if (_isGameOver(winner)) {
      // Delay finishing the game to allow the last clicked cell show its owner.
      setTimeout(() => _finishGame(winner), 0);
    } else {
      
    }

  }




  function _isGameOver(winner) {
    if (winner) return true; // There's a winner;

    return Gameboard.allCellsOccupied(); // True if it's a draw, else false;
  }


  function _finishGame(winner) {
    View.update(handlers);

    if (winner) {
      alert(`${winner.getName()} wins!`);
      winner.win();
    } else {
      Game.draw();
      alert("It's a draw!");
    }

    _reset();
  }




  function _reset(){
    Game.reset();
    Gameboard.reset();

    View.update(handlers);
  }





  function _handlePickRandom() {
    const player = Game.getCurrentPlayer();

    // Ensure this function is only available to the random AI player.
    if ( !(player.isRandom()) ) {
      throw "Only random AI player may use this function."; 
    }

    const legalCells = Gameboard.getEmptyCells();
    console.log(legalCells);
    const chosenCell = Util.arraySample(legalCells);

    
    setTimeout(() => _updateGameboard(chosenCell, player), 1000);
  }


  function _handlePickOptimal() {
    const player = Game.getCurrentPlayer();

    // Ensure this function is only available to the unbeatable AI player.
    if ( !(player.isUnbeatable()) ) {
      throw "Only unbeatable AI player may use this function."; 
    }

    // TODO: write algorithm for the unbeatable AI player.

    // Temporary solution (unbeatable AI picks random legal cells)
    const legalCells = Gameboard.getEmptyCells();
    console.log(legalCells)
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