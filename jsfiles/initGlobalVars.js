var timeMult = 1;
var mouseWasPressed = false;

var globalMouse = new Mouse();

var viewTranslation = new p5.Vector(100, 0);
var viewScale = 1;

var states = {
  start:  "Start",
  flying: "Flying",
  dead:   "Dead",
};
var state = states.start;


var attractors;
var runner;