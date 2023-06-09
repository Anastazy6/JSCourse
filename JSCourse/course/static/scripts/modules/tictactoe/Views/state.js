/**
 * Namespace for the State bar part of the view.
 */
const State = (function() {
  const _p1Name   = document.getElementById("p1-name"  );
  const _p1Symbol = document.getElementById("p1-symbol");
  const _p1Wins   = document.getElementById("p1-wins"  );

  const _p2Wins   = document.getElementById("p2-wins"  );
  const _p2Symbol = document.getElementById("p2-symbol");
  const _p2Name   = document.getElementById("p2-name"  );

  const _currentPlayerSymbol = document.getElementById("current-player-symbol");


  function initialize(players) {
    _p1Name  .innerText = players.p1.getName();
    _p1Symbol.innerText = players.p1.getSymbol();
    _p1Wins  .innerText = players.p1.getWins();

    _p2Wins  .innerText = players.p2.getWins();
    _p2Symbol.innerText = players.p2.getSymbol();
    _p2Name  .innerText = players.p2.getName();

    _currentPlayerSymbol.innerText = players.current.getSymbol();

    _setColorOfSymbols(players);
  }


  function update(players) {
    _p1Wins.innerText = players.p1.getWins();
    _p2Wins.innerText = players.p2.getWins();

    _currentPlayerSymbol.innerText   = players.current.getSymbol();
    _currentPlayerSymbol.style.color = players.current.getColor();
  }

  
  function _setColorOfSymbols(players) {
    _p1Symbol.style.color = players.p1.getColor();
    _p2Symbol.style.color = players.p2.getColor();

    _currentPlayerSymbol.style.color = players.current.getColor();
  }


  return {
    initialize: initialize,
    update    : update
  }
})()

export default State;