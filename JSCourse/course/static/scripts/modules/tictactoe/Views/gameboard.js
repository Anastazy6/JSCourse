/**
 * Namespace for the Gameboard part of the view.
 */
const Gameboard = (function() {
  const _gameboard = document.getElementById('gameboard');

  const DEFAULT_COLOR = '#f8f8ff'; // ghostwhite



  function update(currentState, handlers){
    const fragment = _render(currentState, handlers);
    
    _clear();
    _gameboard.append(fragment);
  }


  /*****************************************************************************
  *********************************** Private **********************************
  *****************************************************************************/


  function _render(gameboard, handlers) {
    const fragment = document.createDocumentFragment();

    Object.keys(gameboard).map(alignment => {
      const owner = gameboard[alignment];
      fragment.append(_createCell(alignment, owner, handlers));
    })

    return fragment;
  }


  function _clear() {
    _gameboard.innerHTML = '';
  }


  function _createCell(alignment, owner, handlers) {
    const cell  = document.createElement('div');
    
    cell.classList.add(
      `cell-${alignment}`,
      'gameboard-cell'
    );

    cell.style.color = owner ? owner.getColor()  : DEFAULT_COLOR;
    cell.innerText   = owner ? owner.getSymbol() : '';
    cell.dataset.Id  = alignment;
    cell.onclick     = handlers.clickCell;

    return cell;
  }


  return {
    update   : update
  }
})()

export default Gameboard;