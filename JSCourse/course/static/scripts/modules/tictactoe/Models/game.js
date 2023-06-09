const Game = (function() {
  let currentPlayer;
  let startingPlayer;
  
  let player1;
  let player2;
  


  const getCurrentPlayer = () => currentPlayer;

  function setCurrentPlayer() {
    currentPlayer = currentPlayer === player1 ?
      player2 :
      player1 ;
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


  return {
    getCurrentPlayer: getCurrentPlayer,
    setCurrentPlayer: setCurrentPlayer,

    reset           : reset,

    getPlayers      : getPlayers,
    setPlayers      : setPlayers
  }
})()

export default Game;