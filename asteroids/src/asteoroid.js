const Util = require("./utils");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "purple",
  RADIUS: 15,
  SPEED: 5,
};

function Asteroid(options) {
  options = options || {};
  options.color = DEFAULTS.COLOR;
  options.pos = options.pos || options.game.randomPosition();
  options.radius = DEFAULTS.RADIUS;
  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
