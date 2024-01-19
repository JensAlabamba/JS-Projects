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
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

module.exports = Ship;
