var timeMult = 1;
var mouseWasPressed = false;

var globalMouse = new Mouse();

var viewTranslation = new p5.Vector(100, 0);
var viewScale = 1;


var assets = {
    explosion: [],
}


var state;
var currentLevel;


var attractors;
var zippers;
var obstacles;
var runner;