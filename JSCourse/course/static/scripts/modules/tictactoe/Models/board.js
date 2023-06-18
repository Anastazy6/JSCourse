const Board = (function() {
  let gameboard = {};

  const getState = () => gameboard;

  const _social = ['L', 'N', 'C'];
  const _moral  = ['G', 'N', 'E'];


  const _diagonalWin = [
    ['LG', 'NN', 'CE'],
    ['CG', 'NN', 'LE']
  ]


  const _winningRows = [
    ..._singleAxisWin(_social),
    ..._singleAxisWin(_moral),
    ..._diagonalWin
  ];
  


  // Yep, the gameboard is basen on DnD cell chart. This obviously adds
  //   needless complexity, but for some reason I wanted to do it this way.
  function reset() {
    gameboard = {
      'LG': null, 'NG': null, 'CG': null,
      'LN': null, 'NN': null, 'CN': null,
      'LE': null, 'NE': null, 'CE': null
    }
  }

  /**
   * 
   * @param {gameboard} gameboard - any gameboard Object holding current (default)
   *   or future state of the game (only used for advanced AI behaviour).
   *   Keep the gameboard parameter default unless evaluating possible future states
   *    of the game is required.
   * @returns {Player} player object representing the player, who has won the round
   *   if there's a winner, else returns false
   */
  function findWinner(board=gameboard) {
    let victoryRows = _winningRows.filter(row => _isRowVictorious(row));

    if (victoryRows.length === 0) return false; // Winner not found;

    let winner = board[victoryRows[0][0]];

    // Assert that there can only be one winner.
    if (victoryRows.some(row => board[row[0]] !== winner)) {
      console.error(victoryRows);
      throw 'There cannot be 2 winners. The hell is going on?';
    }

    return winner;
  }


  function getEmptyCells(board=gameboard) {
    return Object.keys(board).filter(cell => (
      board[cell] === null
    ));
  }


  /**
   * 
   * @param {gameboard} board - any gameboard Object holding current (default)
   *   or future state of the game (only used for advanced AI behaviour).
   *   Keep the gameboard parameter default unless evaluating possible future states
   *   of the game is required.
   * @returns true if all the cells are occupied, i.e. there are no moves left;
   *   else returns false
   */
  function allCellsOccupied(board=gameboard) {
    return Object.keys(board).every(cell => board[cell]);
  }


  function setOwnership(cell, player, board=gameboard) {
    if (isCellOccupied(cell)) {
      throw `Attempt at reoccupying a cell (${cell}) has NOT been blocked successfully!`
    }

    board[cell] = player;
  }


  function isCellOccupied(cell, board=gameboard) {
    return (board[cell] === null) ?
      false :
      true  ;
  }


  /*****************************************************************************
  *********************************** Private **********************************
  *****************************************************************************/



  function _singleAxisWin(axis) {
    const cells = axis === _social ? _moral : _social
    let rows    = [];
    
    axis.map(a => {
      let newRow = [];
      
      cells.map(c => {
        let cell = axis === _social ?
          a + c :
          c + a ; 

        newRow = [...newRow, cell];
      })
      rows = [...rows, newRow];
    })

    return rows;
  }


  function _getOwnerId(cell, board=gameboard) {
    return board[cell] ? board[cell].getId() : false;
  }


  function _isRowVictorious(row) {
    let cells = [
      _getOwnerId(row[0]),
      _getOwnerId(row[1]),
      _getOwnerId(row[2])
    ]

    const neitherIsFalse = () => (
      cells.every(owner => owner !== false)
    )

    const allAreTheSame = () => (
      cells[0] === cells[1] &&
      cells[0] === cells[2]
    );

    return neitherIsFalse() && allAreTheSame();
  }



  return {
    allCellsOccupied: allCellsOccupied,
    findWinner      : findWinner,
    getEmptyCells   : getEmptyCells,
    getState        : getState,
    isCellOccupied  : isCellOccupied,
    reset           : reset,
    setOwnership    : setOwnership
  }
})()

export default Board;