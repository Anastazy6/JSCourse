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
  const mainBoard = Game.getState().mainBoard;
  let counter = 0;

  function move(player) {
    // Ensure this function is only available to the unbeatable AI player.
    if ( !(player.isUnbeatableAI()) ) {
      throw "Only unbeatable AI player may use this function."; 
    }

    const isMaximizingPlayer = _isMaximizing(player);

    return _findBestMove(mainBoard.getState(), 0, isMaximizingPlayer);
  }

  function _findBestMove(mainBoard, depth, isMaximizingPlayer) {
    counter++;
    console.log(counter);
    const legalMoves = mainBoard.getEmptyCells();
    let bestMove = null;
  //  console.log(`Current mainBoard:`);
  //  console.log();

    legalMoves.forEach(cell => {
      let move = Move(cell, _minmax(mainBoard, depth, isMaximizingPlayer));
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



  function _minmax(mainBoard, depth, isMaximizingPlayer) {
    //console.log(`Is terminal: ${_isTerminalState()}`);
    if (_isTerminalState()) return _evaluate(mainBoard, depth);

    //console.log(`Depth: ${depth}`);
    //console.log(mainBoard.getEmptyCells());
    if (depth > _getMaxDepth()) {

      console.log();

      throw new RangeError(
        `Maximum recursion depth reached: max depth is ${_getMaxDepth()}`
        );
    }

    

    return _performFutureMove(mainBoard, depth, isMaximizingPlayer);
  }


  function _performFutureMove(mainBoard, depth, isMaximizingPlayer) {
    const player = isMaximizingPlayer ? 
      Game.getState().player1 :
      Game.getState().player2;

    
    let bestValue = isMaximizingPlayer ? -2137 : 2137;
    
    mainBoard.getEmptyCells().forEach(cell => {
      const futuremainBoard = {...mainBoard};
      //console.log(cell);
      //console.log();
      //console.log(futuremainBoard);

      mainBoard.setOwnership(cell, player, futuremainBoard);
      //console.log(futuremainBoard[cell].to_s());
      let value = _findBestMove(futuremainBoard, depth + 1, !isMaximizingPlayer);

      /*console.log(
        `mainBoard: ${mainBoard}\n` +
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
    return mainBoard.getEmptyCells().length;
  }


  function _isTerminalState() {
    if (  mainBoard.allCellsOccupied() ||
          mainBoard.findWinner      ()
    ) return true;
    return false
  }


  function _evaluate(mainBoard, depth) {
    const winner  = mainBoard.findWinner();
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