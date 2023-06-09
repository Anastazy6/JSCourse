const Player = (id, name, symbol, color, type) => {
  let wins = 0;

  const getId     = () => id;

  const getName   = () => name;

  const setSymbol = newSymbol => symbol = newSymbol;
  const getSymbol = () => symbol || '?';

  const getWins   = () => wins;
  const win       = () => wins =+ 1;

  const getColor  = () => color;
  const getType   = () => type;

  const to_s = () => (
    `Name  : ${name}\nSymbol: ${symbol}\nColor : ${color}\nType  : ${type}\nWins  : ${wins}`
  )

  return {
    getColor : getColor,
    getId    : getId,
    getName  : getName,
    getSymbol: getSymbol,
    getType  : getType,
    getWins  : getWins,
    setSymbol: setSymbol,
    to_s     : to_s,
    win      : win
  }
}

export default Player;