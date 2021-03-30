let qwerty;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  
  attractors = [
    new Attractor(   0,   0, 150, 30, true),
    new Attractor( 600, 400, 150, 30, false),
    new Attractor(1200,   0, 150, 30, false),
    new Attractor(1800, 400, 150, 30, true),
  ]
  
  zippers = [
    new Zipper(   0,   0,  600, 400, 150, 100),
    new Zipper( 600, 400, 1200,   0, 150, 100),
    new Zipper(1200,   0,    0,   0, 150, 100),
  ]

  initStars(width * height / 320);
  
  runner = new Runner(-200, 50, 18, -12);
}


function draw() {
  timeStep();

  runnerStep();
  starStep();
  attractorStep();
  
  updateCamera();
  drawScene();
}



function timeStep() {
  timeMult = 2 * getTimeMult(runner.pos.x, runner.pos.y, attractors);
  
  
  if (runner.connectedAttractor.index !== -1) {
    if (attractors[runner.connectedAttractor.index].collided(runner.pos.x, runner.pos.y)) {
      console.log("dead");
    }
    onConnect(timeMult);
  }
}



function runnerStep() {
  if (mouseIsPressed) {
    if (!mouseWasPressed) {
      runner.onMouseDown(attractors);
    }
  } else {
    if(mouseWasPressed) {
      runner.onMouseRelease();
      onDisconnect();
    }
  }
  mouseWasPressed = mouseIsPressed;
  
  runner.updateSpringLength(timeMult);
  
  runner.doPhysicsStep(attractors, zippers, timeMult);
}

function starStep() {
  rotateStars(timeMult);
}

function attractorStep() {
  attractors.forEach(
    element => {
      element.rotStep(timeMult);
    }
  );
}


function updateCamera() {
  viewScale = 2;
  viewTranslation = new p5.Vector(runner.pos.x - width / 2 / viewScale, runner.pos.y - height / 2 / viewScale);
  
  globalMouse.scale = viewScale;
  globalMouse.translation = viewTranslation;
}

function drawScene() {
  starryBackground();
  zippers.forEach(
    element => {
      element.draw();
    }
  );
  attractors.forEach(
    element => {
      element.draw();
    }
  );
  runner.draw();
}