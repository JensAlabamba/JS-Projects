const { resolve } = require("path");
const Board = require("./board");
const HumanPlayer = require("./humanPlayer");

const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Game {
  constructor() {
    this.board = new Board();
    this.player1 = new HumanPlayer();
    this.player2 = new HumanPlayer();
    this.currentPlayerMove = this.player1;
  }

  promptMove(callback) {
    this.board.print();
    console.log("Enter a place you want to put your mark eg. '0 0': ");
    reader.question(">  ", (input) => {
      const [rowIdx, colIdx] = input.split(" ").map(Number);
      callback([rowIdx, colIdx]);
    });
  }

  switchTurn() {
    if (this.currentPlayerMove === this.player1) {
      this.currentPlayerMove = this.player2;
    } else {
      this.currentPlayerMove = this.player1;
    }
  }

  async createPlayers() {
    await this.player1.create();
    await this.player2.create();
    console.log(`Players created: `);
    console.log(
      `Player 1: ${this.player1.playerName} \nPlayer 2: ${this.player2.playerName}`
    );
  }

  async run(completionCallback) {
    while (
      !this.board.winner(this.currentPlayerMove.playerMark) &&
      !this.board.draw()
    ) {
      await new Promise((resolve) => {
        this.promptMove(([rowIdx, colIdx]) => {
          if (
            this.board.placeMark(
              [rowIdx, colIdx],
              this.currentPlayerMove.playerMark
            )
          ) {
            if (this.board.winner(this.currentPlayerMove.playerMark)) {
              console.log(`${this.currentPlayerMove.playerName} is a winner!`);
              resolve();
            } else if (this.board.draw() === true) {
              console.log("It's a DRAW!!!");
              resolve();
            } else {
              this.switchTurn();
              console.log(`${this.currentPlayerMove.playerName}! Your move!`);
              resolve();
            }
          } else {
            console.log("Invalid move!");
            resolve();
          }
        });
      });
    }
    completionCallback();
  }
}

// TEST
// const game = new Game();

// async function initializeGame() {
//   await game.createPlayers();
//   console.log(game);
//   game.switchTurn();

//   console.log(game);
//   reader.close();
// }

// initializeGame();

module.exports = Game;
