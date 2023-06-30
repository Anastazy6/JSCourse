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
  const mainBoard = () => Game.getState().board;
  let   counter   = 0;

  function move(player) {
    Asserts.playerIsUnbeatableAI(player);

    let bestMove = godMinmax(mainBoard(), 0, _isMaximizing(player)).cell;
    console.log(bestMove);
    console.log(`Done in ${counter} iterations`);
    counter = 0;

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




  function _betterValue(value, bestValue, isMaximizingPlayer) {
    return isMaximizingPlayer ?
      Math.max(value, bestValue) :
      Math.min(value, bestValue) ;
  }


  function _getMaxDepth() {
    return mainBoard().getEmptyCells().length;
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

    //console.log(`All occupied: ${board.allCellsOccupied()}`);
    //console.log(`Winner: ${!!winner}`);
    //console.log(`Draw: ${board.allCellsOccupied() && !winner}`);
    //board.print();

    if (winner === player1) return  10 - depth;
    if (winner === player2) return -10 + depth;
    if (board.allCellsOccupied() && !winner) return 0; // Draw;
    
    return false;
  }


  function godMinmax(board, depth, isMaximizingPlayer) {
    Asserts.maxRecursionDepthNotExceeded(depth, 10);
    counter++;
    //if (counter === 1000) debugger;
    
    //console.log(`\n\n\n Iteration #${counter}`);

    //board.print();


    let score = _evaluate(board, depth);
    //console.log(`Score: ${score}`);
    if (!!score) return score;


    
    const legalMoves = board.getEmptyCells();
    //console.log(legalMoves);
    //if (legalMoves.length === 0) {
    //  console.log(`There are no moves left, this should be true: ${board.allCellsOccupied()}`);
    //}

    let bestMove = null;

    legalMoves.forEach(cell => {
      const futureBoard = Board({...board.getState()});
      const player  = _getFuturePlayer(isMaximizingPlayer);
      
      let bestValue = isMaximizingPlayer ? -2137 : 2137;
      
      //console.log(`Picked cell: ${cell}`);
      futureBoard.setOwnership(cell, player);
      
      
      let value = godMinmax(futureBoard, depth + 1, !isMaximizingPlayer);
      bestValue = _betterValue(value, bestValue, isMaximizingPlayer);

      let move = Move(cell, bestValue);
      bestMove = _betterMove(bestMove, move, isMaximizingPlayer);
    })
    return bestMove;
  }



  return {
    move: move
  }
})()


export default UnbeatableAI;




/*
  function _minmax(board, depth, isMaximizingPlayer) {
    const score = _evaluate(board, depth);


    if (!!score) return score;

    return _performFutureMove(board, depth, isMaximizingPlayer);
  }
*/

/*
  function _performFutureMove(board, depth, isMaximizingPlayer) {
    const player  = _getFuturePlayer(isMaximizingPlayer);
    let bestValue = isMaximizingPlayer ? -2137 : 2137;
    
    board.getEmptyCells().forEach(cell => {
      const futureBoard = Board({...board.getState()});
      futureBoard.setOwnership(cell, player);
      let value = _findBestMove(futureBoard, depth + 1, !isMaximizingPlayer);
      
      bestValue = _betterValue(value, bestValue, isMaximizingPlayer);
    })

    return bestValue;
  }
*/

/*
  function _isTerminalState(board) {
  //  console.log(board);
    if (  board.allCellsOccupied() ||
          board.findWinner()
    ) return true;
    return false
  }
*/


/*
  function _findBestMove(board, depth, isMaximizingPlayer) {
    counter++;
    if (counter === 1000) debugger;
    const legalMoves = board.getEmptyCells();
    console.log(`\n\n\n Iteration #${counter}`);

    board.print();
    console.log(legalMoves);

    if (legalMoves.length === 0) {
      console.log(`There are no moves left, this should be true: ${board.allCellsOccupied()}`);
    }
    
    let bestMove = null;

    legalMoves.forEach(cell => {
      let move = Move(cell, _minmax(board, depth, isMaximizingPlayer));
      bestMove = _betterMove(bestMove, move, isMaximizingPlayer)
    });

    return bestMove;
  }
*/