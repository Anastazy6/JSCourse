import Cell from "./cell.mjs";
import _ from "lodash";

function Board (owner) {

}

function createBoard () {
  return _.range(10).map(row => createRow());
} 

function createRow () {
  return _.range(10).map(cell => Cell());
}

export default Board;

// temporary, for testing:

export { createRow, createBoard };