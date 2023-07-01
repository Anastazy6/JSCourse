'use strict'

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
  const mainBoard     = () => Game.getState().board;
  const currentPlayer = () => Game.getState().current;
  
  const player1 = Game.getState().player1;
  const player2 = Game.getState().player2;
  
  let   counter   = 0;


  function move(player) {
    Asserts.playerIsUnbeatableAI(player);
    const isMax = _isMaximizing(player);

    let board = mainBoard();
    let bestMove  = null;
    let bestValue = isMax ? -2137 : 2137;

    board.getEmptyCells().forEach(cell => {
      let futureBoard = Board({...board.getState()});
      futureBoard.setOwnership(cell, player);
      
      let moveValue = minmax(futureBoard, 0, isMax);
      let move = Move(cell, moveValue);

      bestMove  = _getBetterMove(bestMove, move, isMax);
      bestValue = _getBetterValue(moveValue, bestValue, isMax);
    })
    
    console.log(`Done in ${counter} iterations`);
    counter = 0;

    return bestMove.cell;
  }


  function minmax(board, depth, isMax) {
    Asserts.maxRecursionDepthNotExceeded(depth, _getMaxDepth());

    const score = _evaluate(board, depth);
    if (!!score) return score;

    counter++;

    const legalMoves = board.getEmptyCells();
    let best = isMax ? -2137 : 2137;

    legalMoves.forEach(cell => {
      const futureBoard = Board({...board.getState()});
      const player      = _getFuturePlayer(isMax);
      
      futureBoard.setOwnership(cell, player);
        
      let value = minmax(futureBoard, depth + 1, !isMax);
      best = _getBetterValue(value, best, isMax);
    })

    return best;
  }



  function _getBetterMove(bestMove, newMove, isMax) {
    if (bestMove === null ||
        _getBetterValue(newMove.value, bestMove.value, isMax)
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


  function _getBetterValue(value, bestValue, isMax) {
    return isMax ?
      Math.max(value, bestValue) :
      Math.min(value, bestValue) ;
  }


  function _getMaxDepth() {
    return mainBoard().getEmptyCells().length;
  }


  function _getFuturePlayer(isMax) {
    return isMax ? 
      player1 :
      player2 ;
  }


  function _evaluate(board, depth) {
    const winner  = board.findWinner();

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