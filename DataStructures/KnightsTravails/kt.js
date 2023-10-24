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


  function knightMoves (start, finish) {
    [start, finish].forEach(pos => _validatePosition(pos));

    const movesQueue = _initializeMovesQueue(start);
    
    return _findShortestPath(movesQueue, finish);
  }


  function _initializeMovesQueue (start) {
    const movesQueue = [];
    
    _findLegalMoves(start).forEach(move => {
      movesQueue.push([start, move]);
    });

    return movesQueue;
  }
  

  function _findShortestPath (movesQueue, finish) {
    while (movesQueue.length > 0) {
      let path     = movesQueue.shift();
      let lastMove = path[path.length - 1];

      if (_isFinishReached(lastMove, finish)) {
        return path;
      }

      _enqueueMoves(movesQueue, path, lastMove);
    }
  }


  function _isFinishReached (lastMove, finish) {
    return (lastMove[0] === finish[0]) && (lastMove[1] === finish[1]);
  }


  function _enqueueMoves (movesQueue, path, lastMove) {
    let legalMoves  = _findLegalMoves(lastMove);

    legalMoves.forEach(newMove => 
      movesQueue.push([...path, newMove])
    );
  }


  function _isPositionLegal (pos) {
    return _isCoordLegal(pos[0]) && _isCoordLegal(pos[1]);
  }


  function _isCoordLegal (coord) {
    return (0 <= coord) && (coord <= 7);
  }


  function _validatePosition (pos) {
    if ( !(_isPositionLegal(pos))) {
      throw new RangeError('Coordinates must be within 0 to 7');
    }
  }


  function _findLegalMoves (pos) {
    const moves = [];

    _moveRange.forEach(move => {
      let x = pos[0] + move[0];
      let y = pos[1] + move[1];

      let newPosition = [x, y];
      if (_isPositionLegal(newPosition)) {
        moves.push(newPosition);
      } 
    });
    return moves;
  }


  return {
    knightMoves: knightMoves
  }
})();

export default Knight;

console.log(Knight.knightMoves([3, 3], [5, 5]));
console.log(Knight.knightMoves([2, 4], [6, 1]));
console.log(Knight.knightMoves([0, 0], [7 ,7]));
console.log(Knight.knightMoves([0, 0], [1, 2]));
