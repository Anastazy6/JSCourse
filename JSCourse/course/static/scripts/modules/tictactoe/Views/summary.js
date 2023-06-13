const Summary = (function() {

  const container    = document.getElementById("summary-container");
  const winner       = document.getElementById("winner"           );
  const p1score      = document.getElementById("player1-score"    );
  const p2score      = document.getElementById("player2-score"    );
  const restartBtn   = document.getElementById("restart-button"   );
  const nextRoundBtn = document.getElementById("next-round-button");      

  /**
   *  Disables restart button and next round button when the summary is not shown
   *    by crippling their onclick event handlers so that even dev tools won't be
   *    of use.
   */
  function disable() {
    [restartBtn, nextRoundBtn].forEach(button => {
      button.onclick = () => (
        console.log("Sorry, this won't work until you finish this round")
      );
    })
  }


  function enableButtons(handlers) {
    restartBtn  .onclick = handlers.restart,
    nextRoundBtn.onclick = handlers.nextRound
  }


  function showResults(results) {
    const p1 = results.player1;
    const p2 = results.player2;
    
    winner .innerText = results.winner     ?
        `${resultsWinner.getName()} wins!` :
        "It's a draw!";
    
    p1score.innerText = `${p1.getName()}'s score: ${p1.getWins()}`;
    p2score.innerText = `${p2.getName()}'s score: ${p2.getWins()}`;
  }

  return {
    container: container,
    
    disable      : disable,
    enableButtons: enableButtons,
    showResults  : showResults
  }
})()

export default Summary;