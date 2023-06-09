import Player from "./player.js";
import Board  from "./board.js";

const Game = (function() {
  let handlers;

  function setHandlers(newHandlers) {
    handlers = newHandlers;
  }

  let board;

  let currentPlayer;
  let startingPlayer;
  let player1;
  let player2;

  let draws  = 0;
  let over   = false;
  let winner = null;
  
  const draw   = () => draws++;

  function setMainBoard() {
    if (!!board) return board.reset();

    board = Board();
    board.reset();
  }


  function startNewGame(gameData) {
    _reset();

    _setPlayers(
      _createPlayer(1, gameData),
      _createPlayer(2, gameData)
    )

    startNewRound();
  }

  function startNewRound() {
    over = false;
    board.reset();

    // Remember who's moved first this round so as to let the other player
    //   move first in the next round
    startingPlayer = startingPlayer === player1 ?
        player2 :
        player1 ;

    currentPlayer = startingPlayer;

    if ( !(currentPlayer.isHuman()) ) _performAIMove();
  }


  function registerMove(cell, player) {
    board.setOwnership(cell, player);

    setWinner();
    if (!!winner || board.allCellsOccupied()) over = true;
  }


  function setWinner() {
    winner = board.findWinner();
  }


  function finishRound() {
    winner ? winner.win() : draw();
  }


  function nextTurn() {
    if (over) finishRound();

    currentPlayer = currentPlayer === player1 ?
        player2 :
        player1 ;

    if ( !(currentPlayer.isHuman()) ) _performAIMove();
  }


  function getState() {
    return {
      board  : board,
      player1: player1,
      player2: player2,
      current: currentPlayer,
      over   : over,
      winner : winner,
      draws  : draws
    }
  }





  /*****************************************************************************
  *********************************** Private **********************************
  *****************************************************************************/



  function _reset() {
    player1 = null;
    player2 = null;

    currentPlayer  = null;
    startingPlayer = null;

    draws  = 0
    winner = null;
    over   = false;
    setMainBoard();
  }


  function _setPlayers(newPlayer1, newPlayer2) {
    player1 = newPlayer1;
    player2 = newPlayer2;
  }


  function _createPlayer(id, gameData) {
    const attributes = ['name', 'symbol', 'color', 'type'];
    
    return Player(
      id,
      ...attributes.map(attr => (
        gameData.get(`player-${id}-${attr}`)
      )),      
    )
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
    setHandlers  : setHandlers,
    startNewGame : startNewGame,
    startNewRound: startNewRound,

    draw        : draw,
    finishRound : finishRound,
    getState    : getState,
    nextTurn    : nextTurn,
    registerMove: registerMove,
    setWinner   : setWinner
  }
})()

export default Game;