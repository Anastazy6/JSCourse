const Gameboard = (function() {
  let gameboard = {};
  

  const getState = () => gameboard;

  function reset() {
    gameboard = {
      'LG': null, 'NG': null, 'CG': null,
      'LN': null, 'NN': null, 'CN': null,
      'LE': null, 'NE': null, 'CE': null
    }
  }





  function setOwnership(alignment, player) {
    if (! (gameboard[alignment] === null)) return; // Prevent action if a cell is occupied;

    gameboard[alignment] = player;
  }


  return {
    getState    : getState,
    reset       : reset,
    setOwnership: setOwnership
  }
})()

export default Gameboard;