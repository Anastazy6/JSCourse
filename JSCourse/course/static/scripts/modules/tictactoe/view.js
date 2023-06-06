const View = (function() {
  const launcher     = document.getElementById('launcher'     );
  const launcherForm = document.getElementById('launcher-form');
  const gameboard    = document.getElementById('gameboard'    );
  const summary      = document.getElementById('summary'      );




  // Game state

  const p1Name   = document.getElementById("p1-name"  );
  const p1Symbol = document.getElementById("p1-symbol");
  const p1Wins   = document.getElementById("p1-wins"  );

  const p2Wins   = document.getElementById("p2-wins"  );
  const p2Symbol = document.getElementById("p2-symbol");
  const p2Name   = document.getElementById("p2-name"  );

  const currentPlayerSymbol = document.getElementById("current-player-symbol");
  
  

  


  function updateGameboard(gameboardFragment){
    _clearGameboard();
    gameboard.append(gameboardFragment);
  }

  function _clearGameboard() {
    gameboard.innerHTML = '';
  }


  return {
    gameboard      : gameboard,  
    launcherForm   : launcherForm,
    updateGameboard: updateGameboard
  }
})()

export default View;