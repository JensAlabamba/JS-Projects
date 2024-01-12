const { resolve } = require("path");
const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HumanPlayer {
  constructor() {
    this.playerName;
    this.playerMark;
  }

  async create() {
    await new Promise((resolve) => {
      console.log("Enter your name! ");
      reader.question(">  ", (answer1) => {
        this.playerName = answer1;
        resolve();
      });
    });
    await new Promise((resolve) => {
      console.log("Enter your desired MARK:  ");
      reader.question(">  ", (answer2) => {
        this.playerMark = answer2;
        resolve();
      });
    });
    console.log(
      `Picked name: ${this.playerName} \nPicked mark: ${this.playerMark} \n------------------------------------`
    );
  }
}

module.exports = HumanPlayer;
