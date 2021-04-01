function stateWin(stateTimer) {
  timeStep();

  starStep();
  attractorStep();

  updateCamera();

  drawWin(stateTimer);

  if (stateTimer >= 30) state = newState(states.continue);
}

function drawWin(stateTimer) {
  background(0);
  setClipCircle(stateTimer + 60);
  drawClippedScene(stateTimer + 60);
  drawRunner();
}