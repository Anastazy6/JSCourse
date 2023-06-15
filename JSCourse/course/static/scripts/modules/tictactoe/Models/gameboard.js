const Gameboard = (function() {
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
  


  // Yep, the gameboard is basen on DnD alignment chart. This obviously adds
  //   needless complexity, but for some reason I wanted to do it this way.
  function reset() {
    gameboard = {
      'LG': null, 'NG': null, 'CG': null,
      'LN': null, 'NN': null, 'CN': null,
      'LE': null, 'NE': null, 'CE': null
    }
  }


  function findWinner() {
    let victoryRows = _winningRows.filter(row => _isRowVictorious(row));

    if (victoryRows.length === 0) return false; // Winner not found;

    let winner = gameboard[victoryRows[0][0]];

    // Assert that there can only be one winner.
    if (victoryRows.some(row => gameboard[row[0]] !== winner)) {
      console.error(victoryRows);
      throw 'There cannot be 2 winners. The hell is going on?';
    }

    return winner;
  }


  function getEmptyCells() {
    return Object.keys(gameboard).filter(alignment => (
      gameboard[alignment] === null
    ));
  }


  function allCellsOccupied() {
    return Object.keys(gameboard).every(alignment => gameboard[alignment]);
  }


  function setOwnership(alignment, player) {
    if (isCellOccupied(alignment)) {
      throw `Attempt at reoccupying a cell (${alignment}) has NOT been blocked successfully!`
    }

    gameboard[alignment] = player;
  }


  function isCellOccupied(alignment) {
    return (gameboard[alignment] === null) ?
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
        let alignment = axis === _social ?
          a + c :
          c + a ; 

        newRow = [...newRow, alignment];
      })
      rows = [...rows, newRow];
    })

    return rows;
  }


  function _getOwnerId(alignment) {
    return gameboard[alignment] ? gameboard[alignment].getId() : false;
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

export default Gameboard;