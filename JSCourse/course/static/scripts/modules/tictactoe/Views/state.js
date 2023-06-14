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


  function initialize(game) {
    _p1Name  .innerText = game.player1.getName();
    _p1Symbol.innerText = game.player1.getSymbol();
    _p1Wins  .innerText = game.player1.getWins();

    _p2Wins  .innerText = game.player2.getWins();
    _p2Symbol.innerText = game.player2.getSymbol();
    _p2Name  .innerText = game.player2.getName();

    _currentPlayerSymbol.innerText = game.current.getSymbol();

    _setColorOfSymbols(game);
  }


  function update(game) {  
    _p1Wins.innerText = game.player1.getWins();
    _p2Wins.innerText = game.player2.getWins();

    _currentPlayerSymbol.innerText   = game.current.getSymbol();
    _currentPlayerSymbol.style.color = game.current.getColor();
  }

  
  function _setColorOfSymbols(game) {
    _p1Symbol.style.color = game.player1.getColor();
    _p2Symbol.style.color = game.player2.getColor();

    _currentPlayerSymbol.style.color = game.current.getColor();
  }


  return {
    initialize: initialize,
    update    : update
  }
})()

export default State;