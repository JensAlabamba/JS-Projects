const MovingObject = require("./moving_object");
window.MovingObject = MovingObject;

const Asteroid = require("./asteoroid");
window.Asteroid = Asteroid;

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementById("canvas");
  const ctx = canvasEl.getContext("2d");
});
