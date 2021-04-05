import {rotateStars, starryBackground} from "./backgroundStars.js";
import {getTimeMult, onConnect, onDisconnect} from "./time.js";
import {drawExplosion} from "../states/stateDead.js";

const defaultButtonSize = 50;

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function timeStep() {
  timeMult = getTimeMult(runner.pos.x, runner.pos.y, attractors);
  
  
  if (runner.connectedAttractor.index !== -1)
    onConnect(timeMult);
  else
    onDisconnect(timeMult);
}

export function starStep() {
  rotateStars(timeMult);
}

export function attractorStep() {
  attractors.forEach(
    element => {
      element.rotStep(timeMult);
    }
  );
}

export function runnerStep() {
  if (mouseIsPressed) {
    if (!mouseWasPressed) {
      runner.onMouseDown(attractors);
    }
  } else {
    if(mouseWasPressed) {
      runner.onMouseRelease();
    }
  }
  if (mouseIsPressed && !mouseWasPressed && runner.connectedAttractor.index === -1) mouseWasPressed = !runnerLookahead(5);
  else mouseWasPressed = mouseIsPressed;
  
  runner.updateSpringLength(timeMult);
  
  runner.doPhysicsStep(attractors, zippers, timeMult);
}


function runnerLookahead(steps) {
  let lookaheadRunner = _.cloneDeep(runner);

  for (let i = 0; i < steps; i++) {
    lookaheadRunner.updateSpringLength(timeMult);
    lookaheadRunner.doPhysicsStep(attractors, zippers, timeMult);
    lookaheadRunner.onMouseDown(attractors);
    if (lookaheadRunner.connectedAttractor.index !== -1) return true;
  }
}


export function updateCamera() {
  viewScale = 1.5;
  viewTranslation = new p5.Vector(runner.pos.x - width / 2 / viewScale, runner.pos.y - height / 2 / viewScale);
  
  globalMouse.scale = viewScale;
  globalMouse.translation = viewTranslation;
}

export function drawBase(inAttractors) {
  starryBackground(inAttractors);
  obstacles.forEach(
    element => {
      element.draw();
    }
  );
}







export function drawAttractors() {
  drawingContext.save();
  drawingContext.beginPath();
  for (let i = 0; i < attractors.length; i++) {
    attractors[i].drawBounds();
  }
  for (let i = attractors.length - 2; i > 0; i--) {
    attractors[i].drawBounds();
  }
  drawingContext.clip();
  drawBase(true);
  drawingContext.restore();

  attractors.forEach(
    element => {
      element.draw();
    }
  );
}



export function drawScene() {
  drawBase(false);

  zippers.forEach(
    element => {
      element.draw();
    }
  );
  
  drawAttractors();

  finishLine.draw();
}

export function drawRunner() {
  runner.draw(true);
}




export function attributesInObject(object) {
  var length = 0;
  for(var _ in object) length++;
  return length;
}

export function getButtonHoverIndex(buttonCount) {
  for (let i = 0; i < buttonCount; i++) {
    let buttonCenter = new p5.Vector(width/2, height/2);
    buttonCenter.add(-(buttonCount - 1) * defaultButtonSize * 2, 0);
    buttonCenter.add(i * defaultButtonSize * 4, 0);
    if (dist(buttonCenter.x, buttonCenter.y, mouseX, mouseY) < defaultButtonSize) return i;
  }
  return -1;
}

export function drawButton(buttons, button, ind, buttonCount, opacity) {
  fill(100, opacity);
  stroke(255, opacity);
  strokeWeight(3);

  push();
    translate(width / 2, height / 2);
    translate(-(buttonCount - 1) * defaultButtonSize * 2, 0);
    translate(ind * defaultButtonSize * 4, 0);
    buttons[button].draw(defaultButtonSize);
  pop();
}


export function setClipCircle(stateTimer) {
  noStroke();
  ellipse(width / 2, height / 2, 9000 - stateTimer * 100, 9000 - stateTimer * 100);
}

export function drawClippedScene(stateTimer) {
  drawingContext.save();
  drawingContext.clip();
  drawScene();
  drawExplosion(
    Math.floor(stateTimer / 3),
    runner.pos.x, runner.pos.y
  )
  drawingContext.restore();
}