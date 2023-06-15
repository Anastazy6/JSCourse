const Game = (function() {
  let handlers;

  function setHandlers(newHandlers) {
    handlers = newHandlers;
  }


  let currentPlayer;
  let startingPlayer;
  let player1;
  let player2;

  let draws  = 0;
  let over   = false;
  let winner = null;
  
  const draw   = () => draws++;


  function setWinner(newWinner) {
    winner = newWinner;

    if (!!winner) over = true;
  }

  function finishRound(roundWinner=null) {
    over   = true;
    winner = roundWinner;
    if (roundWinner === null) draw();
  }


  function nextTurn() {
    currentPlayer = currentPlayer === player1 ?
        player2 :
        player1 ;

    if ( !(currentPlayer.isHuman()) ) _performAIMove();
  }


  function getState() {
    return {
      player1: player1,
      player2: player2,
      current: currentPlayer,
      over   : over,
      winner : winner,
      draws  : draws
    }
  }


  function reset(){
    over = false;
    startingPlayer = startingPlayer === player1 ?
        player2 :
        player1 ;

    currentPlayer = startingPlayer;
    if ( !(currentPlayer.isHuman()) ) _performAIMove();
  }


  function setPlayers(newPlayer1, newPlayer2) {
    player1 = newPlayer1;
    player2 = newPlayer2;

    startingPlayer = player1;
  }


  function _performAIMove() {
    if (over) return;

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
    setHandlers: setHandlers,

    draw       : draw,
    finishRound: finishRound,
    getState   : getState,
    nextTurn   : nextTurn,
    reset      : reset,
    setPlayers : setPlayers,
    setWinner  : setWinner
  }
})()

export default Game;