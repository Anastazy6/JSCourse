import Asserts from "../asserts.js";

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

const UnbeatableAI = (function() {
  const mainBoard = () => Game.getState().board;
  let   counter   = 0;

  function move(player) {
    Asserts.playerIsUnbeatableAI(player);

    return _findBestMove(mainBoard(), 0, _isMaximizing(player)).cell;
  }


  function _findBestMove(board, depth, isMaximizingPlayer) {
    counter++;
    //console.log('In find best move');
    //console.log(board);
    //console.log(`Counter: ${counter}`);
    const legalMoves = board.getEmptyCells();
    let bestMove = null;

    legalMoves.forEach(cell => {
      let move = Move(cell, _minmax(board, depth, isMaximizingPlayer));
      bestMove = _betterMove(bestMove, move, isMaximizingPlayer)
    });

    return bestMove;
  }


  function _betterMove(bestMove, newMove, isMaximizingPlayer) {
    if (bestMove === null ||
        _betterValue(newMove.value, bestMove.value, isMaximizingPlayer)
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
    //console.log('In minmax');
    //console.log(`Is terminal: ${_isTerminalState(board)}`);
    const score = _evaluate(board, depth);

    if (!!score) {
      //console.log(`Cunter: ${counter} Score: ${score}`);
      return score;
    }

    if (depth <= 2) {
      console.log(`Depth: ${depth} Counter: ${counter}`);
      board.print();
    }
    //console.log(`Depth: ${depth}`);
    //console.log(board.getEmptyCells());
    //Asserts.maxRecursionDepthNotExceeded(depth, _getMaxDepth());

    return _performFutureMove(board, depth, isMaximizingPlayer);
  }


  function _performFutureMove(board, depth, isMaximizingPlayer) {
    //console.log('In perform future move');
    const player = _getFuturePlayer(isMaximizingPlayer);

    let bestValue = isMaximizingPlayer ? -2137 : 2137;
    
    board.getEmptyCells().forEach(cell => {
      const futureBoard = Board({...board.getState()});
      //console.log(cell);
      //console.log(futureBoard.getState());

      futureBoard.setOwnership(cell, player);
      //console.log(futureBoard.getState()[cell].to_s());
      let value = _findBestMove(futureBoard, depth + 1, !isMaximizingPlayer);

    //  console.log(
    //    `mainBoard: ${mainBoard}\n` +
    //    `Cell     : ${cell}\n`   +
    //    `Value    : ${value}` 
    //  )
      
      if (_betterValue(value, bestValue)) {
        bestValue = value;
      }
    })
      return bestValue;
  }


  function _betterValue(value, bestValue, isMaximizingPlayer) {
    return isMaximizingPlayer ?
      value > bestValue :
      value < bestValue ;
  }


  function _getMaxDepth() {
    return mainBoard().getEmptyCells().length;
  }


  function _isTerminalState(board) {
  //  console.log(board);
    if (  board.allCellsOccupied() ||
          board.findWinner()
    ) return true;
    return false
  }


  function _getFuturePlayer(isMaximizingPlayer) {
    return isMaximizingPlayer ? 
      Game.getState().player1 :
      Game.getState().player2 ;
  }


  function _evaluate(board, depth) {
    const game    = Game.getState();
    const winner  = board.findWinner();
    
    const player1 = game.player1;
    const player2 = game.player2;

    if (winner === player1) return  10 - depth;
    if (winner === player2) return -10 + depth;
    if (board.allCellsOccupied() && !winner) return 0; // Draw;
    
    return false;
  }


  return {
    move: move
  }
})()


export default UnbeatableAI;