let qwerty;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  
  attractors = [
    new Attractor(   0,   0, 150, 30, true),
    new Attractor(1200, 800, 150, 30, false),
    new Attractor(2400,   0, 150, 30, false),
    new Attractor(3600, 800, 150, 30, true),
  ]
  
  zippers = [
    new Zipper( 140,  -50, 1050,  725, 100, 100, 1),
    new Zipper(1340,  850, 2250,   75, 100, 100, 1),
    new Zipper(2540,  -50, 3450,  725, 100, 100, 1),
    new Zipper(3725,  750, 3725,  300, 100, 100, 1),
    new Zipper(3725,  300, 3500,    0, 100, 100, 4),
    new Zipper(3500, -100, 3200, -300, 100, 100, 4),
    new Zipper(3200, -400, 1000, -400,  100, 100, 4),
    new Zipper(1000, -400,  300, -200,  100, 100, 4),
  ]

  initStars(width * height / 320);
  
  runner = new Runner(-200, 50, 24, -18);
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
  timeMult = getTimeMult(runner.pos.x, runner.pos.y, attractors);
  
  
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

function drawAttractors() {
  drawingContext.save();
  drawingContext.beginPath();
  for (let i = 0; i < attractors.length; i++) {
    attractors[i].drawBounds();
  }
  for (let i = attractors.length - 2; i > 0; i--) {
    attractors[i].drawBounds();
  }
  drawingContext.clip();
  starryBackground();
  drawingContext.restore();

  attractors.forEach(
    element => {
      element.draw();
    }
  );
}

function drawScene() {
  starryBackground();
  zippers.forEach(
    element => {
      element.draw();
    }
  );
  
  drawAttractors();

  runner.draw();
}


function keyPressed() {
  if (keyCode === 32 || keyCode == 80) {
    isLooping() ? noLoop() : loop();
  }
}