let attractorTimer = 0;

function getTimeMult(x, y, attractors) {
  
  if (attractorTimer === 0) {
    return nearAttractorMult(x, y, attractors);
  } else if (attractorTimer < 50) {
    return 8 / (33 - attractorTimer / (50 / 9));
  } else {
    return 1 / 3;
  }
}

function nearAttractorMult(x, y, attractors) {
  minTimeMult = 1;
  for (let i = 0; i < attractors.length; i++) {
    let n = map(
      dist(attractors[i].x, attractors[i].y, x, y),
      attractors[i].fieldSize - 25,
      attractors[i].fieldSize + 50,
      attractors[i].fieldSize - 5,
      attractors[i].fieldSize + 50,
      true
    )
    minTimeMult = min(minTimeMult, (n - attractors[i].fieldSize + 16) / 66);
  }
  return minTimeMult;
}

function onConnect(timeMult) {
  attractorTimer += timeMult * 10;
}

function onDisconnect() {
  attractorTimer = 0;
}