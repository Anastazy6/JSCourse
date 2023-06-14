import ViewUtils from "../../../Utilities/viewUtils.js";

import Gameboard from "./gameboard.js";
import Launcher  from "./launcher.js";
import State     from "./state.js";
import Summary   from "./summary.js";

import Game      from "../Models/game.js";
import Board     from "../Models/gameboard.js";



const View = (function() {
  const _gameContainer = document.getElementById("game-container");

  const _views = {
    'launcher': Launcher.container,
    'game'    : _gameContainer,
    'summary' : Summary.container
  }


  function startGame(handlers) {
    State.initialize(Game.getState());
    Gameboard.update(Board.getState(), handlers)

    show('game');
  }


  function update(handlers) {
    Gameboard.update(Board.getState(), handlers);
    State    .update(Game.getState());
  }


  function showSummary(handlers) {
    console.log(handlers);
    show('summary');
    Summary.showResults(Game.getState());
    Summary.enableButtons(handlers)
  }


  function show(currentView, display='block') {
    _catchWrongViewName(currentView);
    
    Object.keys(_views).map(view => ViewUtils.hide(_views[view]));

    ViewUtils.show(_views[currentView], display)
  }


  function _catchWrongViewName(view) {
    if ( !(Object.keys(_views).includes(view))) {
      try {
        throw new Error(
          `Invalid view name: "${view}"\n`           +  
          `Ensure the view name is one of these:` +
          `${Object.keys(_views).map(v => ` "${v}"`)}`,
        )
      } catch (e) {
        console.log(`${e.name}\n${e.message}`);
      }
    }
  }



  return {
    Gameboard: Gameboard,
    Launcher : Launcher,
    State    : State,
    Summary  : Summary,

    startGame  : startGame,
    show       : show,
    showSummary: showSummary,
    update     : update
  }
})()

export default View;