var timeMult = 1;
var mouseWasPressed = false;

var globalMouse = new Mouse();

var viewTranslation = new p5.Vector(100, 0);
var viewScale = 1;


var assets = {
    explosion: [],
}

let levelsDisplayed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
let menuPage = 0;
let unlocked = [0];

var state;
var currentLevel;


var attractors;
var zippers;
var obstacles;
var runner;