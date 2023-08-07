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
  
  const player1 = () => Game.getState().player1;
  const player2 = () => Game.getState().player2;
  
  let   counter   = 0;


  function move(player) {
    Asserts.playerIsUnbeatableAI(player);
    const isMax = _isMaximizing(player);
    const board = mainBoard();

    
    const legalMoves = board.getEmptyCells();
    let bestMove  = null;
    let bestValue = isMax ? -2137 : 2137;

    legalMoves.forEach(cell => {
      console.log(board);
      let futureBoard = Board({...board.getState()});
      futureBoard.setOwnership(cell, player);

      let value = minmax(futureBoard, 0, !isMax);
      
      console.log(`Move: ${cell} Value: ${value}`);
      
      if (( isMax  && value > bestValue) ||
          ( !isMax && value < bestValue)) {
        bestMove  = cell;
        bestValue = value;
      }
    })
    
    console.log(`Done in ${counter} iterations`);
    counter = 0;

    return bestMove;
  }


  function minmax(board, depth, isMax) {
    Asserts.maxRecursionDepthNotExceeded(depth, _getMaxDepth());

    console.log(
      `Counter  : ${counter}\n` +
      `Depth    : ${depth}\n` +
      `Player ID: ${player.getId()}`
    );

    const score = _evaluate(board, depth);
    if (!!score) console.log(score);
    if (!!score) return score;

    counter++;

    const legalMoves = board.getEmptyCells();
    const player     = isMax ? player1() : player2();

    let best = isMax ? -2137 : 2137;
    

    console.log(legalMoves);
      
    legalMoves.forEach(cell => {
      const nextBoard  = Board({...board.getState()});

      console.log(cell);

      //nextBoard.print();
      nextBoard.setOwnership(cell, player);
      //nextBoard.print();
      
      let value = minmax(nextBoard, depth + 1, !isMax);
      best = _getBetterValue(value, best, isMax);
    })
    return best;
  }


  function _getBetterMove(bestMove, newMove, isMax) {
    if (bestMove === null ) return newMove;

    if (isMax) {
      if (bestMove.value > newMove.value) return bestMove;
      return newMove
    }
    if (bestMove.value < newMove.value) return bestMove;
    return newMove;
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

    console.log('Evaluating...');
    board.print();
    if (!!winner) console.log(winner.to_s());

    if (winner === player1()) return  10 - depth;
    if (winner === player2()) return -10 + depth;
    if (board.allCellsOccupied() && !winner) return 0; // Draw;
    
    return false;
  }



  return {
    move: move
  }
})()


export default UnbeatableAI;