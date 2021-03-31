function stateDead(stateTimer) {
  timeStep();

  starStep();
  attractorStep();

  updateCamera();

  drawDead(stateTimer);

  if (stateTimer >= 90) state = newState(states.restart);
}

function drawDead(stateTimer) {
  background(0);

  drawingContext.save();
  stroke(100);
  strokeWeight(2);
  ellipse(width / 2, height / 2, 9000 - stateTimer * 100, 9000 - stateTimer * 100);

  drawingContext.clip();
  drawScene();
  drawExplosion(
    Math.floor(stateTimer / 3),
    runner.pos.x, runner.pos.y
  )

  drawingContext.restore();
}

function drawExplosion(frame, x, y) {
  if (frame >= assets.explosion.length) return;

  pixelSize = 100 * viewScale;

  let screenPos = new p5.Vector(
    (x - viewTranslation.x) * viewScale,
    (y - viewTranslation.y) * viewScale,
  );

  image(
    assets.explosion[frame],
    screenPos.x - pixelSize / 2, screenPos.y - pixelSize / 2,
    pixelSize, pixelSize
  );
}