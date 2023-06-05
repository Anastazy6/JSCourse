const Gameboard = (function() {
  let gameboard = {};
  
  function render() {
    const fragment = document.createDocumentFragment();

    gameboard.map(alignment => {
      fragment.append(_createCell(alignment));
    })

    return fragment;
  }


  function reset() {
    gameboard = {
      'LG': null, 'NG': null, 'CG': null,
      'LN': null, 'NN': null, 'CN': null,
      'LE': null, 'NE': null, 'CE': null
    }
  }


  function setOwnership(field, player) {
    if (! (gameboard[field] === null)) return; // Prevent action if a cell is occupied;

    gameboard[field] = player;
  }





  function _createCell(alignment) {
    const owner = gameboard.alignment;
    const cell  = document.createElement('div');
    
    cell.classList.add(
      `cell-${alignment}`,
      'gameboard-cell'
    );
    cell.innerText = owner.symbol || '';

    return cell;
  }




  return {
    render      : render,
    reset       : reset,
    setOwnership: setOwnership
  }
})()

export default Gameboard;