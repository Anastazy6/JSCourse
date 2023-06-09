const Gameboard = (function() {
  let gameboard = {};

  const getState = () => gameboard;

  const _social = ['L', 'N', 'C'];
  const _moral  = ['G', 'N', 'E'];

  const _diagonalWin = [
    ['LG', 'NN', 'CE'],
    ['CG', 'NN', 'LE']
  ]

  const _winningRows = _calculateWinningRows();
  



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

    if (victoryRows.some(row => gameboard[row[0]] !== winner)) {
      throw 'There cannot be 2 winners. The hell is going on?';
    }

    return winner;
  }



  function allCellsOccupied() {
    return Object.keys(gameboard).every(alignment => gameboard[alignment]);
  }


  function setOwnership(alignment, player) {
    if (isCellOccupied(alignment)) {
      throw "Attempt at reoccupying a cell has NOT been blocked successfully!"
    }

    gameboard[alignment] = player;
  }


  function isCellOccupied(alignment) {
    return (gameboard[alignment] === null) ?
      false :
      true ;
  }


  /*****************************************************************************
  *********************************** Private **********************************
  *****************************************************************************/


  function _calculateWinningRows() {
    let rows = [];
    
    rows = [...rows, ..._singleAxisWin(_social, _moral)];
    rows = [...rows, ..._singleAxisWin(_moral, _social)];
    rows = [...rows, ..._diagonalWin];

    return rows;
  }


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

    const neitherIsFalse = () => cells.every(cell => cell !== false);

    const allAreTheSame = () => (
      cells[0] === cells[1] &&
      cells[0] === cells[2]
    );

    return neitherIsFalse() && allAreTheSame();
  }



  return {
    allCellsOccupied: allCellsOccupied,
    findWinner      : findWinner,
    getState        : getState,
    isCellOccupied  : isCellOccupied,
    reset           : reset,
    setOwnership    : setOwnership
  }
})()

export default Gameboard;