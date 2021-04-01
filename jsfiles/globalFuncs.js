function timeStep() {
  timeMult = getTimeMult(runner.pos.x, runner.pos.y, attractors);
  
  
  if (runner.connectedAttractor.index !== -1)
    onConnect(timeMult);
  else
    onDisconnect(timeMult);
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

function runnerStep() {
  if (mouseIsPressed) {
    if (!mouseWasPressed) {
      runner.onMouseDown(attractors);
    }
  } else {
    if(mouseWasPressed) {
      runner.onMouseRelease();
    }
  }
  mouseWasPressed = mouseIsPressed;
  
  runner.updateSpringLength(timeMult);
  
  runner.doPhysicsStep(attractors, zippers, timeMult);
}





function updateCamera() {
  viewScale = 1.5;
  viewTranslation = new p5.Vector(runner.pos.x - width / 2 / viewScale, runner.pos.y - height / 2 / viewScale);
  
  globalMouse.scale = viewScale;
  globalMouse.translation = viewTranslation;
}

function drawBase() {
  starryBackground();
  obstacles.forEach(
    element => {
      element.draw();
    }
  );
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
  drawBase();
  drawingContext.restore();

  attractors.forEach(
    element => {
      element.draw();
    }
  );
}



function drawScene() {
  drawBase();

  zippers.forEach(
    element => {
      element.draw();
    }
  );
  
  drawAttractors();
}

function drawRunner() {
  runner.draw();
}