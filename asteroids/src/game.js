const Asteroid = require("./asteoroid");
function Game() {
  this.asteroids = [];

  this.addAsteroids();
}

Game.BG_COLOR = "white";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.NUM_ASTEROIDS = 10;

Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else {
    throw new Error("Invalid Object");
  }
};

Game.prototype.addAsteroids = function () {
  for (i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.add(new Asteroid({ game: this }));
  }
};

Game.prototype.randomPosition = function randomPosition() {
  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
};

// Game.prototype.step = function () {};

// Game.prototype.move = function () {};

// Game.prototype.checkCollisions = function () {};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function (obj) {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function (obj) {
    obj.move();
  });
};
