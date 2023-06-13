const Game = (function() {
  let currentPlayer;
  let startingPlayer;
  
  let player1;
  let player2;

  let draws = 0;

  let over   = false;
  let winner = false;
  
  const draw   = () => draws++;
  const isOver = () => over;
  const getWinner = () => winner;
  const setWinner = newWinner => winner = newWinner;

  const getCurrentPlayer = () => currentPlayer;


  function finishRound(roundWinner=null) {
    over   = true;
    winner = roundWinner;
    if (roundWinner === null) draw();
  }


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


  function getState() {
    return {
      player1: player1,
      player2: player2,
      over   : over,
      winner : winner,
      draws  : draws
    }
  }


  function reset(){
    startingPlayer = startingPlayer === player1 ?
        player2 :
        player1 ;

    currentPlayer = startingPlayer;
    over          = false;
  }


  function setPlayers(newPlayer1, newPlayer2) {
    player1 = newPlayer1;
    player2 = newPlayer2;

    startingPlayer = player1;
  }


  function _performAIMove(handlers) {
    if (isOver()) return;

    switch (currentPlayer.getType()) {
      case 'AI-random':
        return handlers.pickRandom();
      case 'AI-unbeatable':
        return handlers.pickOptimal();
      default:
        throw `Invalid player type for AI move picker: ${currentPlayer.getType()}`;
    }
  }


  return {
    draw            : draw,
    finishRound     : finishRound,
    getCurrentPlayer: getCurrentPlayer,
    getPlayers      : getPlayers,
    getState        : getState,
    getWinner       : getWinner,
    isOver          : isOver,
    nextTurn        : nextTurn,
    reset           : reset,
    setPlayers      : setPlayers,
    setWinner       : setWinner
  }
})()

export default Game;