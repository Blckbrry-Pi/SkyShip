function stateStart(stateTimer) {
  timeStep();

  updateCamera();
  
  drawScene();
  drawRunner();

  darkeningRect(stateTimer);
  if (stateTimer > 45) startCountdown(stateTimer - 45);

  if(stateTimer >= 134) state = newState(states.flying);
}

function darkeningRect(stateTimer) {
  let rectTransparency = max(255 - 255 / 45 * stateTimer, 0);
  fill(0, 0, 0, rectTransparency);
  noStroke();
  rect(0, 0, width, height);
}

function startCountdown(stateTimer) {
  let numberIndex = Math.floor(stateTimer / 30)
  let number = 3 - numberIndex;

  let textColor = [color(255, 0, 0), color(255, 255, 0), color(0, 255, 0)][numberIndex]

  let fadeInTransp = 25.5 * constrain(stateTimer % 30, 0, 10);
  let fadeOutTransp = 255 - 12.25 * constrain(stateTimer % 30 - 10, 0, 20);
  let transparency = min(fadeInTransp, fadeOutTransp);

  let sizeDiff = (10 - constrain(stateTimer % 30, 0, 10)) * 20
  let size = sizeDiff + 200

  fill(textColor.levels[0], textColor.levels[1], textColor.levels[2], transparency);
  stroke(0);
  strokeWeight(5);

  textSize(size);
  textFont("impact");
  textAlign(CENTER, CENTER);


  text(
    number,
    width / 2,
    height / 2
  )
}