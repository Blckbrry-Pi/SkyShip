
let Mouse;
import("./mouse.js").then(module => {
  Mouse = module.Mouse;
  globalMouse = new Mouse();
})

let timeMult = 1;
let mouseWasPressed = false;

let globalMouse;

let viewTranslation = new p5.Vector(100, 0);
let viewScale = 1;


let assets = {
    explosion: [],
}

let levelsDisplayed = [0, 1, 2];
let menuPage = 0;
let unlocked = [0];

let state;
let currentLevel;


let attractors;
let zippers;
let obstacles;
let runner;
let finishLine;