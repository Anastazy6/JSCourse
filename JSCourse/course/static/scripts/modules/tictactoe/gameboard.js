const Gameboard = (function() {
  let gameboard = {};
  
  function render() {
    // Rendering logic goes here
    console.log("Rendering is not yet implemented");
  }

  function reset() {
    gameboard = {
      'LG': null, 'NG': null, 'CG': null,
      'LN': null, 'NN': null, 'CN': null,
      'LE': null, 'NE': null, 'CE': null
    }
    render();
  }

  function setOwnership(field, player) {
    if (! (gameboard[field] === null)) return; // Prevent action if a cell is occupied;

    gameboard[field] = player;
  }


  return {
    render      : render,
    reset       : reset,
    setOwnership: setOwnership
  }
})()

export default Gameboard;