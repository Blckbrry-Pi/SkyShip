let timeMult;
let mouseWasPressed = false;

let viewTranslation;
let viewScale;

let globalMouse;

let assets = {
  explosion: [],
}

let levelsDisplayed;
let menuPage = 0;
let unlocked;

let state;
let currentLevel;


let attractors;
let zippers;
let obstacles;
let runner;
let finishLine;


let preloadDone = [false, false];
let setupDone = false;


let drawFunc = undefined;

function preload() {
  import("./js/sketchInit.js").then(module => module.preload());
}

function setup() {}

function draw() {
  if (!preloadDone.includes(false)) {
    if (!setupDone) {
      import("./js/sketchInit.js").then(module => module.setup());
      setupDone = true;
    } else {
      if (typeof drawFunc != "function") {
        import("./js/sketchInit.js").then(module => {
          drawFunc = module.draw;
          module.draw();
        });
      } else {
        drawFunc();
      }
    }
  }
}
