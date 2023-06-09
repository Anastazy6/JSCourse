import Game      from "./Models/game.js";
import Player    from "./Models/player.js";
import Gameboard from "./Models/gameboard.js";

import View      from "./Views/view.js";


const TicTacToe = (function() {
  function run() {
    View.Launcher.form.onsubmit = handlers.startGame;
  }


  const handlers = {
    startGame: _handleStartGame,
    setOwner : _handleSetOwner
  }


  function _handleStartGame(event) {
    event.preventDefault();

    _startGame();

    const players = Game.getPlayers();

    Gameboard.reset();
    _updateGameboard()
    View.State.initialize(players);
  }


  function _handleSetOwner(event) {
    event.stopPropagation();

    const alignment = event.target.dataset.Id;
    const owner     = Game.getCurrentPlayer();
    
    Gameboard.setOwnership(alignment, owner);
    
    let winner = Gameboard.findWinner();
    
    _updateGameboard();
    if (_isGameOver(winner)) {
      _finishGame(winner);
    } else {
      _continueGame()
    }
  }


  function _startGame() { 
    const newGameData = new FormData(View.Launcher.form);

    Game.setPlayers(
      _createPlayer(1, newGameData),
      _createPlayer(2, newGameData)
    );
    Game.setCurrentPlayer();
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


  function _updateGameboard() {
    View.Gameboard.update(Gameboard.getState(), handlers);
    View.State    .update(Game.getPlayers());
  }


  function _isGameOver(winner) {
    if (winner) return true; // There's a winner;

    return Gameboard.allCellsOccupied(); // True if it's a draw, else false;
  }


  function _finishGame(winner) {
    _updateGameboard();

    if (winner) {
      alert(`${winner.getName()} wins!`);
      winner.win();
    } else {
      alert("It's a draw!");
    }

    _reset();
  }


  function _continueGame() {
    Game.setCurrentPlayer();
  }


  function _reset(){
    Game.reset();
    Gameboard.reset();

    _updateGameboard();
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