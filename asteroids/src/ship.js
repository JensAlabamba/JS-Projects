const MovingObject = require("./moving_object");
const Util = require("./utils");

const DEFAULTS = {
  COLOR: "white",
  RADIUS: 15,
  SPEED: 0,
};

function Ship(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  options.game = options.game;
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
