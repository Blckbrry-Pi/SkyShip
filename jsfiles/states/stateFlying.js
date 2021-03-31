function stateFlying(stateTimer) {
  timeStep();
  testForDeath();
  
  starStep();
  attractorStep();
  
  runnerStep();


  updateCamera();
  
  drawScene();
  drawRunner();
}