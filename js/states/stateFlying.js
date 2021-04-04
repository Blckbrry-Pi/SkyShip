import {
  timeStep,
  starStep,
  attractorStep,
  runnerStep,
  updateCamera,
  drawScene,
  drawRunner
} from "../extraFunctions/globalFuncs.js";
import {newState, states} from "./states.js";

export function stateFlying(stateTimer) {
  timeStep();
  testForDeath();
  testForWin();
  
  starStep();
  attractorStep();
  
  runnerStep();


  updateCamera();
  
  drawScene();
  drawRunner();
}

function testForDeath() {
  attractors.forEach(
    element => {
      if (element.collided(runner.pos.x, runner.pos.y)) state = newState(states.dead);
    }
  );
  obstacles.forEach(
    element => {
      if (element.pointInObstacle(runner.pos)) state = newState(states.dead);
    }
  );
}

function testForWin() {
  if (finishLine.pointInLine(runner.pos)) state = newState(states.win);
}