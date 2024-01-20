const Bullet = require("./bullet");
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

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function fireBullet() {
  const norm = Util.norm(this.vel);

  if (norm === 0) {
    // Can't fire unless moving.
    return;
  }

  const relVel = Util.scale(Util.dir(this.vel), Bullet.SPEED);

  const bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];

  const bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: "red",
    game: this.game,
  });

  this.game.add(bullet);
};
module.exports = Ship;
