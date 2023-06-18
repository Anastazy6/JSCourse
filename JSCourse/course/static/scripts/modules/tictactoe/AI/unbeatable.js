import Board from "../Models/board.js";
import Game  from "../Models/game.js";

const UnbeatableAI = (function() {

  function move(player) {
    // Ensure this function is only available to the unbeatable AI player.
    if ( !(player.isUnbeatableAI()) ) {
      throw "Only unbeatable AI player may use this function."; 
    }

    const isMaximizingPlayer = _isMaximizing(player);

    return _findBestMove();
  }

  function _findBestMove() {
    const legalMoves = Board.getEmptyCells();
    let bestMove = null;

    legalMoves.forEach(move => bestMove = _betterOf(bestMove, move));

    return bestMove;
  }


  function _betterOf(bestMove, newMove) {

  }


  /**
   *  Player 1 is the maximizing player while player 2 is the minimizing one.
   *    This is obviously arbitrary and I'm only keeping it this way for 
   *    convenience. This function should throw an error if the current player's
   *    ID is neither 1 or 2;
   */
  function _isMaximizing(player) {    
    switch (currentPlayerId) {
      case 1:
        return true;
      case 2:
        return false;
      default:
        throw new RangeError(
          `Invalid player ID: ${currentPlayerId}. Valid values are either 1 or 2`
        );
    }
  }



  function _minmax(board, depth, isMaximizingPlayer) {
    if (_isTerminalState()) return _getScore();

    if (isMaximizingPlayer) {
      let bestValue = -2137;

    } else {

    }


  }

  function _isTerminalState(board) {
    if (  Board.allCellsOccupied(board) ||
          Board.findWinner      (board)
    ) return true;
    return false
  }


  function _evaluate(board) {
    let state = Game.getState();
    
    if ( !(state.winner)) return 0; // Draw
    if (state.winner === state.player1) return  10; // Player 1 wins.
    if (state.winner === state.player2) return -10; // Player 2 wins.

    throw Error("Invalid game resolution");
  }


  return {
    move: move
  }
})()

export default UnbeatableAI;