import ViewUtils from "../../../Utilities/viewUtils.js";

import Gameboard from "./gameboard.js";
import Launcher  from "./launcher.js";
import State     from "./state.js";


import Game      from "../Models/game.js";
import Player    from "../Models/player.js";

import GameboardModel from "../Models/gameboard.js";

const View = (function() {
  const _gameContainer = document.getElementById("game-container");

  const _views = {
    'launcher': Launcher.wrapper,
    'game'    : _gameContainer
  }


  function update(handlers) {
    Gameboard.update(GameboardModel.getState(), handlers);
    State    .update(Game.getPlayers());
  }


  function show(currentView, display='block') {
    _catchWrongViewName(currentView);
    
    Object.keys(_views).map(view => ViewUtils.hide(view));

    ViewUtils.show(currentView, display)
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

    show  : show,
    update: update
  }
})()

export default View;