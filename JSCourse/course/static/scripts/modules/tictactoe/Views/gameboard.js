/**
 * Namespace for the Gameboard part of the view.
 */
const Gameboard = (function() {
  const gameboard = document.getElementById('gameboard');

  function update(currentState){
    _clear();
    const fragment = _render(currentState);

    gameboard.append(fragment);
  }


  function _render(gameboard) {
    const fragment = document.createDocumentFragment();

    Object.keys(gameboard).map(alignment => {
      fragment.append(_createCell(alignment));
    })

    return fragment;
  }


  function _clear() {
    gameboard.innerHTML = '';
  }


  function _createCell(alignment) {
    const owner = gameboard.alignment;
    const cell  = document.createElement('div');
    
    cell.classList.add(
      `cell-${alignment}`,
      'gameboard-cell'
    );
    cell.innerText = owner ? owner.symbol : '';

    return cell;
  }


  return {
    gameboard   : gameboard,
    update      : update
  }
})()

export default Gameboard;