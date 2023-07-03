const Asserts = (function (){
  function playerIsUnbeatableAI(player) {
    if ( !(player.isUnbeatableAI()) ) {
      throw new TypeError(
        "Only unbeatable AI player may use this function.\n" +
        `Player type is: ${player.getType()}.`
      ); 
    }
  }


  function playerIsRandomAI(player) {
    if ( !(player.isRandomAI()) ) {
      throw new TypeError(
        "Only random AI player may use this function.\n" +
        `Player type is: ${player.getType()}`
      ); 
    }
  }


  function maxRecursionDepthNotExceeded(currentDepth, maxDepth) {
    if (currentDepth > maxDepth) {

      console.log();

      throw new RangeError(
        `Maximum recursion depth reached: max depth is ${maxDepth}`
        );
    }
  }


  function onlyOneWinner(gameboard, victoryRows, winner) {
    if (victoryRows.some(row => gameboard[row[0]] !== winner)) {
      victoryRows.map(row => console.error(
        `Row winner: \n` +
        `${gameboard[row[0]].to_s()}\n` +
        `Game winner: \n` +
        `${winner.to_s()}`
      ));
      throw new Error('There cannot be 2 winners. The hell is going on?');
    }
  }



  return {
    playerIsUnbeatableAI,
    playerIsRandomAI,
    maxRecursionDepthNotExceeded,
    onlyOneWinner,
  }
})()

export default Asserts;