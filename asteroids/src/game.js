const Asteroid = require("./asteoroid");
const Ship = require("./ship");
const Util = require("./utils");
function Game() {
  this.asteroids = [];
  this.ships = [];
  this.bullets = [];
  this.addAsteroids();
  this.addShip();
}

Game.BG_COLOR = "black";
Game.DIM_X = 1000;
Game.DIM_Y = 900;
Game.NUM_ASTEROIDS = 10;

Game.prototype.add = function (object) {
  if (object instanceof Asteroid) {
    this.asteroids.push(object);
  } else if (object instanceof Ship) {
    this.ships.push(object);
  } else {
    throw new Error("Invalid Object");
  }
};

Game.prototype.addShip = function () {
  const ship = new Ship({
    pos: this.randomPosition(),
    game: this,
  });

  this.add(ship);

  return ship;
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.add(new Asteroid({ game: this }));
  }
};

Game.prototype.allObjects = function allObjects() {
  return [].concat(this.ships, this.asteroids, this.bullets);
};

Game.prototype.randomPosition = function randomPosition() {
  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (obj) {
    obj.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (obj) {
    obj.move();
  });
};

Game.prototype.checkCollisions = function () {
  const allObjects = this.allObjects();

  for (let i = 0; i < allObjects.length; i++) {
    for (let j = 0; j < allObjects.length; j++) {
      const obj1 = allObjects[i];
      const obj2 = allObjects[j];

      if (i !== j && obj1.isCollidedWith(obj2)) {
        // Check if i is not equal to j to avoid self-collision
        const collision = obj1.collideWith(obj2);
        if (collision) {
          alert("COLLISION");
        }
      }
    }
  }
};

Game.prototype.remove = function (asteoroid) {
  this.asteroids.splice(this.asteroids.indexOf(asteoroid), 1);
};

Game.prototype.isOutOfBounds = function (pos) {
  return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;
};

Game.prototype.wrap = function (pos) {
  return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
