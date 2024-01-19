/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/asteoroid.js":
/*!**************************!*\
  !*** ./src/asteoroid.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n  COLOR: \"purple\",\n  RADIUS: 25,\n  SPEED: 5,\n};\n\nfunction Asteroid(options) {\n  options = options || {};\n  options.color = DEFAULTS.COLOR;\n  options.pos = options.pos || options.game.randomPosition();\n  options.radius = DEFAULTS.RADIUS;\n  options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n\n  MovingObject.call(this, options);\n}\n\nUtil.inherits(Asteroid, MovingObject);\n\nmodule.exports = Asteroid;\n\n\n//# sourceURL=webpack:///./src/asteoroid.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Asteroid = __webpack_require__(/*! ./asteoroid */ \"./src/asteoroid.js\");\nconst Util = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction Game() {\n  this.asteroids = [];\n\n  this.addAsteroids();\n}\n\nGame.BG_COLOR = \"black\";\nGame.DIM_X = 1000;\nGame.DIM_Y = 900;\nGame.NUM_ASTEROIDS = 10;\n\nGame.prototype.add = function (object) {\n  if (object instanceof Asteroid) {\n    this.asteroids.push(object);\n  } else {\n    throw new Error(\"Invalid Object\");\n  }\n};\n\nGame.prototype.addAsteroids = function () {\n  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.add(new Asteroid({ game: this }));\n  }\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n  return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()];\n};\n\n// Game.prototype.step = function () {};\n\n// Game.prototype.checkCollisions = function () {};\n\nGame.prototype.draw = function (ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n  this.asteroids.forEach(function (obj) {\n    obj.draw(ctx);\n  });\n};\n\nGame.prototype.moveObjects = function () {\n  this.asteroids.forEach(function (obj) {\n    obj.move();\n  });\n};\n\nGame.prototype.isOutOfBounds = function (pos) {\n  return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;\n};\n\nGame.prototype.wrap = function (pos) {\n  return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nfunction GameView(game, ctx) {\n  this.game = game;\n  this.ctx = ctx;\n}\n\nGameView.prototype.start = function () {\n  var self = this;\n  this.interval = setInterval(function () {\n    self.game.moveObjects();\n    self.game.draw(self.ctx);\n  }, 20);\n};\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvasEl = document.getElementById(\"canvas\");\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height = Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new Game();\n  new GameView(game, ctx).start();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/***/ ((module) => {

eval("function MovingObject(options) {\n  this.pos = options.pos;\n  this.vel = options.vel;\n  this.radius = options.radius;\n  this.color = options.color;\n  this.game = options.game;\n}\n\nMovingObject.prototype.isWrappable = true;\n\nMovingObject.prototype.move = function () {\n  this.pos[0] += this.vel[0];\n  this.pos[1] += this.vel[1];\n\n  if (this.game.isOutOfBounds(this.pos)) {\n    if (this.isWrappable) {\n      this.pos = this.game.wrap(this.pos);\n    } else {\n      this.remove();\n    }\n  }\n};\n\nMovingObject.prototype.remove = function () {\n  this.game.remove(this);\n};\n\nMovingObject.prototype.draw = function draw(ctx) {\n  ctx.fillStyle = this.color;\n\n  ctx.beginPath();\n  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n  ctx.fill();\n};\n// MovingObject.prototype.isCollidedWith = function (otherMovingObject) {};\n\nmodule.exports = MovingObject;\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const Util = {\n  inherits(ChildClass, ParentClass) {\n    ChildClass.prototype = Object.create(ParentClass.prototype);\n    ChildClass.prototype.constructor = ChildClass;\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n  // Scale the length of a vector by the given amount.\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  },\n};\n\nmodule.exports = Util;\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;