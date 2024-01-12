const Board = require("./board");

const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  constructor() {
    this.board = new Board();
  }

  promptMove(callback) {
    this.board.print();
    console.log("Enter a place you want to put your mark eg. '0 0': ");
    reader.question(">  ", (input) => {
      const [rowIdx, colIdx] = input.split(" ").map(Number);
      callback(rowIdx, colIdx);
    });
  }

  switchTurn() {}
}
