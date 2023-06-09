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
    ..._singleAxisWin(_social, _moral),
    ..._singleAxisWin(_moral, _social),
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
    console.log(`Chosen cell: ${alignment}`);

    if (isCellOccupied(alignment)) {
      throw "Attempt at reoccupying a cell has NOT been blocked successfully!"
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



  function _singleAxisWin(primary, secondary) {
    let rows = [];
    
    primary.map(s => {
      let newRow = [];
      
      secondary.map(m => {
        let alignment = primary === _social ?
          s + m :
          m + s ; 

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