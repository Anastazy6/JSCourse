import { arrayComp } from "./helpers";

const Knight = (function () {
  const _moveRange = [
    [ 2,  1],
    [ 2, -1],
    [ 1,  2],
    [ 1, -2],
    [-1,  2],
    [-1, -2],
    [-2, -1],
    [-2,  1]
  ]
  

  function _isPositionLegal (pos) {
    pos.forEach(coord => {
      if (!(0 <= coord <=7)) return false;
    })
    return true;
  }


  function _validatePosition (pos) {
    if ( !(_isPositionLegal(pos))) {
      throw new RangeError('Coordinates must be within 0 to 7');
    }
  }


  function _findLegalMoves (pos) {
    const moves = [];

    _moveRange.forEach(move => {
      let newPosition = [pos[0] + move[0], pos[1] + move[1]];
      if (_isPositionLegal(newPosition)) {
        moves.push(newPosition);
      }
    });
    return moves;
  }


  function knightMoves (start, finish) {
    [start, finish].forEach(pos => _validatePosition(pos));

    let movesQueue = [];
    
    // Initialize moves Queue
    _findLegalMoves(start).forEach(move => {
      console.log(`Testing move to: ${move}, is finish: ${arrayComp(move, finish)}`);
      if (arrayComp(move, finish)) return [start, finish]; // In case the finish can be reached in 1 move

      movesQueue.push([start, finish]);
    });

    while (movesQueue.lenght > 0) {
      let currentPath    = movesQueue.shift();
      console.log(currentPath);
      let lastMoveInPath = currentPath[currentPath.length - 1];
      let nextMoves      = _findLegalMoves(lastMoveInPath);

      nextMoves.forEach(move => {
        let newPath = [...currentPath, move];

        if (arrayComp(move, finish)) return newPath;
        
        movesQueue.push(newPath);
      });
    }
  }

  return {
    knightMoves: knightMoves
  }
})();

export default Knight;

Knight.knightMoves([3, 3], [5, 5]);

