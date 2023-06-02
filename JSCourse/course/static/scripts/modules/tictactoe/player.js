function Player(name) {
  let symbol;

  const getName = () => name;

  const setSymbol = newSymbol => symbol = newSymbol;
  const getSymbol = () => this.symbol || '?';


  return {
    setSymbol: setSymbol,
    getSymbol: getSymbol
  }
}

export default Player;