const Game = require("./game");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  var self = this;
  this.interval = setInterval(function () {
    self.game.step();
    self.game.draw(self.ctx);
  }, 20);
};

module.exports = GameView;
