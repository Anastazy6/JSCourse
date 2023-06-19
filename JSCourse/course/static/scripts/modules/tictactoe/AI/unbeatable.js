import Board from "../Models/board.js";
import Game  from "../Models/game.js";

const Move = function(cell, value) {
  return {
    cell,
    value
  }
}

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
    if (newMove.value > bestMove.value) return newMove;

    return bestMove;
  }


  /**
   *  Player 1 is the maximizing player while player 2 is the minimizing one.
   *    This is obviously arbitrary and I'm only keeping it this way for 
   *    convenience. This function should throw an error if the current player's
   *    ID is neither 1 or 2;
   */
  function _isMaximizing(player) {    
    switch (player.getId()) {
      case 1:
        return true;
      case 2:
        return false;
      default:
        throw new RangeError(
          `Invalid player ID: ${player.getId()}. Valid values are either 1 or 2`
        );
    }
  }



  function _minmax(board, depth, isMaximizingPlayer) {
    if (_isTerminalState()) return _evaluate(board, depth);

    return _performFutureMove(board, depth, isMaximizingPlayer);
  }


  function _performFutureMove(board, depth, isMaximizingPlayer) {
    const player = isMaximizingPlayer ? 
      Game.getState().player1 :
      Game.getState().player2;

    
    let bestMove  = null; 
    let bestValue = isMaximizingPlayer ? -2137 : 2137;
    
    Board.getEmptyCells().forEach(cell => {
      const futureBoard = {...board};
      Board.setOwnership(cell, player, futureBoard);  
      let value = _minmax(futureBoard, depth + 1, !isMaximizingPlayer);
      
      if (_better(value, bestValue)) {
        bestMove  = cell;
        bestValue = value;
      }
    })

    return Move(bestMove, bestValue);
  }


  function _better(value, bestValue, isMaximizingPlayer) {
    return isMaximizingPlayer      ?
      value > bestValue :
      value < bestValue ;
  }

  function _best(value, bestValue, isMaximizingPlayer) {
    isMaximizingPlayer      ?
      max(value, bestValue) :
      min(value, bestValue) ;
  }


  function _isTerminalState(board) {
    if (  Board.allCellsOccupied(board) ||
          Board.findWinner      (board)
    ) return true;
    return false
  }


  function _evaluate(board, depth) {
    const winner  = Board.findWinner(board);
    const player1 = Game.getState().player1;
    const player2 = Game.getState().player2;
    
    if ( !(winner)) return 0; // Draw
    if (winner === player1) return  10 - depth;
    if (winner === player2) return -10 + depth;

    throw Error("Invalid game resolution");
  }


  return {
    move: move
  }
})()

export default UnbeatableAI;