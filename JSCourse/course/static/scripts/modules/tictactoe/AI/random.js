import Game  from "../Models/game.js";
import Board from "../Models/board.js";
import Util  from "../../../Utilities/util.js";

const RandomAI = (function() {

  function move(player) {
    // Ensure this function is only available to the random AI player.
    if ( !(player.isRandomAI()) ) {
      throw "Only random AI player may use this function."; 
    }

    const legalCells = Board.getEmptyCells();
    const chosenCell = Util.arraySample(legalCells);

    return chosenCell;
  }


  return {
    move: move
  }
})()

export default RandomAI;