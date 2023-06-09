const Game = (function() {
  let currentPlayer;
  let startingPlayer;
  
  let player1;
  let player2;
  


  const getCurrentPlayer = () => currentPlayer;

  function nextTurn(handlers) {
    currentPlayer = currentPlayer === player1 ?
      player2 :
      player1 ;

    if ( !(currentPlayer.isHuman()) ) _performAIMove(handlers);
  }


  function getPlayers() {
    return {
      p1: player1,
      p2: player2,
      current: currentPlayer
    }
  }


  function reset(){
    startingPlayer = startingPlayer === player1 ?
    player2 :
    player1 ;

    currentPlayer = startingPlayer;
  }


  function setPlayers(newPlayer1, newPlayer2) {
    player1 = newPlayer1;
    player2 = newPlayer2;

    startingPlayer = player1;
  }


  function _performAIMove(handlers) {
    switch (currentPlayer.getType()) {
      case 'AI-random':
        handlers.pickRandom();
        break;
      case 'AI-unbeatable':
        handlers.pickOptimal();
        break;
      default:
        throw `Invalid player type for AI move picker: ${currentPlayer.getType()}`;
    }
  }


  return {
    getCurrentPlayer: getCurrentPlayer,
    getPlayers      : getPlayers,
    nextTurn        : nextTurn,
    reset           : reset,
    setPlayers      : setPlayers
  }
})()

export default Game;