import Asserts from "../asserts.js";

import Game  from "../Models/game.js";

import Util  from "../../../Utilities/util.js";

const RandomAI = (function() {

  function move(player) {
    Asserts.playerIsRandomAI(player);
    
    const board      = Game .getState().board;
    const legalCells = board.getEmptyCells();
    const chosenCell = Util .arraySample(legalCells);

    return chosenCell;
  }


  return {
    move: move
  }
})()

export default RandomAI;