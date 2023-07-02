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



  return {
    playerIsUnbeatableAI,
    playerIsRandomAI,
    maxRecursionDepthNotExceeded,

  }
})()

export default Asserts;