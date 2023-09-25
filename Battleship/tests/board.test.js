import Board from "../src/Board/board.mjs";
import { createRow, createBoard } from "../src/Board/board.mjs";
import Cell from "../src/Board/cell.mjs";



describe("It creates a gameboard for a player", () => {
  const emptyCell = Cell();
  const stringifiedEmptyCell = JSON.stringify(emptyCell);


  test("It creates a single row with 10 elements", () => {
    expect(createRow().length).toBe(10);
  });

  test("The elements in the row are empty cells by default", () => {
    let row = createRow();
    row.map(cell => {
      expect(JSON.stringify(cell)).toEqual(stringifiedEmptyCell);
    });
  });

  test("It creates a board with 10 rows", () => {
    expect(createBoard().length).toBe(10);
  });
});