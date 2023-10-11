import Ship from "../src/Ship/ship";

function getShipCells (ship) {
  return ship.cells.map(cell => cell.position);
}

describe('It creates a ship', () => {
  test("It creates a single cell ship", () => {
    expect(Ship(1).cells.length).toBe(1);
  });


  test("It creates a longer ship", () => {
    for (let i = 2; i <= 4; i++) {
      expect(Ship(i).cells.length).toBe(i);
    }
  });


  test("It requires the ship's length to be an integer", () => {
    expect(() => Ship('four')).toThrow("Ship's length must be an integer between 1 and 4");
  })


  test("It requires the ship's length to be between 1 and 4", () => {
    [-1, 0, 5].forEach(length => {
      expect(Ship(length)).toThrow("Ship's length must be an integer between 1 and 4");
    });
  });


  test("It creates a horizontal ship", () => {
    const exampleShip = (Ship(4, 0, 0, true));
    const shipCells = getShipCells(exampleShip);
    
    const expectedCells = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ];
    

    expect(shipCells).toEqual(expectedCells);
  });


  test("It creates a vertical ship", () => {
    const exampleShip = (Ship(4, 0, 0, false));
    const shipCells = getShipCells(exampleShip);
    
    const expectedCells = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3]
    ]

    expect(shipCells).toEqual(expectedCells);
  });


  test.todo("It requires the ship to be single-dimenshional", () => {

  })
});