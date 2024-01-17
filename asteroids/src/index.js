const MovingObject = require("./moving_object");
window.MovingObject = MovingObject;

let ctx;

document.addEventListener("DOMContentLoaded", function () {
  const canvasEl = document.getElementById("canvas");
  ctx = canvasEl.getContext("2d");
});
