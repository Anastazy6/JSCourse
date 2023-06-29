import Player from "./player.js";

const Board = function(gameboard={}) {
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


  function print() {
    let counter = 0;
    let result = '';

    Object.keys(gameboard).map(cell => {
      result = `${result} ${stringifyCell(cell)}`;
      counter++;
      if (counter % 3 === 0) result += '\n';
    })

    console.log(result);
  }
  

  function stringifyCell(cell) {
    const player = gameboard[cell];

    if (!!player) return `${player.getSymbol()}`;
    return '.';
  }

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
   * @returns {Player} player object representing the player, who has won the round
   *   if there's a winner, else returns false
   */
  function findWinner() {
    let victoryRows = _findVictoryRows();
    if (victoryRows.length === 0) return false; // Winner not found;

    let winner = gameboard[victoryRows[0][0]];
    _assertOneWinner(victoryRows, winner);

    return winner;
  }


  function getEmptyCells() {
    return Object.keys(gameboard).filter(cell => (
      gameboard[cell] === null
    ));
  }


  /**
   * 
   * @param {gameboard} gameboard - any gameboard Object holding current (default)
   *   or future state of the game (only used for advanced AI behaviour).
   *   Keep the gameboard parameter default unless evaluating possible future states
   *   of the game is required.
   * @returns true if all the cells are occupied, i.e. there are no moves left;
   *   else returns false
   */
  function allCellsOccupied() {
    return Object.keys(gameboard).every(cell => gameboard[cell]);
  }


  function setOwnership(cell, player) {
    if (isCellOccupied(cell)) {
      throw `Attempt at reoccupying a cell (${cell}) has NOT been blocked successfully!`
    }

    gameboard[cell] = player;
  }


  function isCellOccupied(cell) {
    return (gameboard[cell] === null) ?
      false :
      true  ;
  }


  /*****************************************************************************
  *********************************** Private **********************************
  *****************************************************************************/


  function _assertOneWinner(victoryRows, winner) {
    if (victoryRows.some(row => gameboard[row[0]] !== winner)) {
      victoryRows.map(row => console.error(gameboard[row[0]], winner));
      throw new Error('There cannot be 2 winners. The hell is going on?');
    }
  }


  function _findVictoryRows() {
    return _winningRows.filter(row => _isRowVictorious(row));
  }


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


  function _getOwnerId(cell) {
    return gameboard[cell] ? gameboard[cell].getId() : false;
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
    print           : print,
    reset           : reset,
    setOwnership    : setOwnership
  }
}

export default Board;