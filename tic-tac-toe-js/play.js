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
      initializeGame();
    } else {
      reader.close();
      process.exit();
    }
  });
}

async function initializeGame() {
  const game = new Game();
  await game.createPlayers();
  game.run(completionCallback);
}

initializeGame();
