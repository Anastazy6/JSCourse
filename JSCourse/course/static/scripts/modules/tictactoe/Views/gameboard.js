/**
 * Namespace for the Gameboard part of the view.
 */
const Gameboard = (function() {
  const _gameboard = document.getElementById('gameboard');

  function update(currentState, handlers){
    _clear();

    console.log(currentState);

    const fragment = _render(currentState, handlers);

    _gameboard.append(fragment);
  }


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
  //  console.log(`New cell...`);
  //  console.log(`Alignment: ${alignment}`);
  //  console.log(`Owner:\n${owner}`);
    
    cell.classList.add(
      `cell-${alignment}`,
      'gameboard-cell'
    );

    cell.style.color = owner ? owner.getColor()  : '#f8f8ff';
    cell.innerText   = owner ? owner.getSymbol() : '';
    cell.dataset.Id  = alignment;
    cell.onclick     = handlers.setOwner;

    return cell;
  }


  return {
    update   : update
  }
})()

export default Gameboard;