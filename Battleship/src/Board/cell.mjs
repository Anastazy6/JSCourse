function Cell () {
  function anchorShip () {
    ship = true;
  }

  return {
    fog: true,
    ship: false,
    anchorShip
  }
}

export default Cell;