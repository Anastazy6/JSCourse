/**
 * Namespace for the State bar part of the view.
 */
const State = (function() {
  const p1Name   = document.getElementById("p1-name"  );
  const p1Symbol = document.getElementById("p1-symbol");
  const p1Wins   = document.getElementById("p1-wins"  );

  const p2Wins   = document.getElementById("p2-wins"  );
  const p2Symbol = document.getElementById("p2-symbol");
  const p2Name   = document.getElementById("p2-name"  );

  const currentPlayerSymbol = document.getElementById("current-player-symbol");


  function initialize(players) {
    p1Name  .innerText = players.p1.getName();
    p1Symbol.innerText = players.p1.getSymbol();
    p1Wins  .innerText = players.p1.getWins();

    p2Wins  .innerText = players.p2.getWins();
    p2Symbol.innerText = players.p2.getSymbol();
    p2Name  .innerText = players.p2.getName();

    currentPlayerSymbol.innerText = players.current.getSymbol();

    _setColorOfSymbols(players);
  }


  function _setColorOfSymbols(players) {
    p1Symbol.style.color = players.p1.getColor();
    p2Symbol.style.color = players.p2.getColor();

    currentPlayerSymbol.style.color = players.current.getColor();
  }


  return {
    initialize: initialize
  }
})()

export default State;