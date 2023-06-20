const Player = (id, name, symbol, color, type) => {
  let wins = 0;
  
  const getColor  = () => color;
  const getId     = () => id;
  const getName   = () => name;
  const getSymbol = () => symbol || '?';
  const getType   = () => type;
  const getWins   = () => wins;
  

  const isHuman        = () => type === 'human';
  const isRandomAI     = () => type === 'AI-random';
  const isUnbeatableAI = () => type === 'AI-unbeatable';


  const win  = () => {
    wins++;
  }
  
  const to_s = () => (
    `Id    : ${id}\n`     +
    `Name  : ${name}\n`   + 
    `Symbol: ${symbol}\n` +
    `Color : ${color}\n`  +
    `Type  : ${type}\n`   +
    `Wins  : ${wins}`
  )


  return {
    getColor : getColor,
    getId    : getId,
    getName  : getName,
    getSymbol: getSymbol,
    getType  : getType,
    getWins  : getWins,

    isHuman       : isHuman,
    isRandomAI    : isRandomAI,
    isUnbeatableAI: isUnbeatableAI,

    to_s: to_s,
    win : win
  }
}

export default Player;