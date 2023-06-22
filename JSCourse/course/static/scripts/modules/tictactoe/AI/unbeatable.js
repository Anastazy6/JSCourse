import Board from "../Models/board.js";
import Game  from "../Models/game.js";

const Move = function(cell, value) {
  function to_s() {
    return `Cell: ${cell}\nValue: ${value}\n`
  }

  return {
    cell,
    value,
    to_s
  }
}

let counter = 0;

const UnbeatableAI = (function() {

  function move(player) {
    // Ensure this function is only available to the unbeatable AI player.
    if ( !(player.isUnbeatableAI()) ) {
      throw "Only unbeatable AI player may use this function."; 
    }

    const isMaximizingPlayer = _isMaximizing(player);

    return _findBestMove(Board.getState(), 0, isMaximizingPlayer);
  }

  function _findBestMove(board, depth, isMaximizingPlayer) {
    counter++;
    console.log(counter);
    const legalMoves = Board.getEmptyCells(board);
    let bestMove = null;
  //  console.log(`Current board:`);
  //  console.log(board);

    legalMoves.forEach(cell => {
      let move = Move(cell, _minmax(board, depth, isMaximizingPlayer));
      bestMove = _betterOf(bestMove, move, isMaximizingPlayer)
   //   console.log(`${move}, ${bestMove}`);
  });

    return bestMove;
  }


  function _betterOf(bestMove, newMove, isMaximizingPlayer) {
    if (bestMove === null ||
        _better(newMove.value, bestMove.value, isMaximizingPlayer)
    ) return newMove;

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
    //console.log(`Is terminal: ${_isTerminalState()}`);
    if (_isTerminalState(board)) return _evaluate(board, depth);

    //console.log(`Depth: ${depth}`);
    //console.log(Board.getEmptyCells(board));
    if (depth > _getMaxDepth()) {

      console.log(board);

      throw new RangeError(
        `Maximum recursion depth reached: max depth is ${_getMaxDepth()}`
        );
    }

    

    return _performFutureMove(board, depth, isMaximizingPlayer);
  }


  function _performFutureMove(board, depth, isMaximizingPlayer) {
    const player = isMaximizingPlayer ? 
      Game.getState().player1 :
      Game.getState().player2;

    
    let bestValue = isMaximizingPlayer ? -2137 : 2137;
    
    Board.getEmptyCells(board).forEach(cell => {
      const futureBoard = {...board};
      //console.log(cell);
      //console.log(board);
      //console.log(futureBoard);

      Board.setOwnership(cell, player, futureBoard);
      //console.log(futureBoard[cell].to_s());
      let value = _findBestMove(futureBoard, depth + 1, !isMaximizingPlayer);

      /*console.log(
        `Board: ${board}\n` +
        `Cell: ${cell}\n`   +
        `Value: ${value}` 
      )*/
      
      if (_better(value, bestValue)) {
        bestValue = value;
      }
    })
      return bestValue;
  }


  function _better(value, bestValue, isMaximizingPlayer) {
    return isMaximizingPlayer      ?
      value > bestValue :
      value < bestValue ;
  }

  function _getMaxDepth() {
    return Board.getEmptyCells().length;
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