const Game = require("./game");

const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function completionCallback() {
  console.log("Game over. Play again? (yes/no): ");
  reader.question("> ", (answer) => {
    if (answer.toLowerCase() === "yes") {
      const newGame = new Game();
      newGame.run(completionCallback);
    } else {
      reader.close();
      process.exit();
    }
  });
}

const game = new Game();
game.run(completionCallback);
