let attractorTimer = 0;
const attractorTimerTarget = 100;

const slowdownRadius = 150;
const slowdownConst_r = 1 / 6;

const slowdownConst_c = 1 / 3;


function getTimeMult(x, y, attractors) {
  return lerp(
    nearAttractorMult(x, y, attractors),
    slowdownConst_c / (1 + slowdownConst_c),
    attractorTimer / attractorTimerTarget
  );
}

function nearAttractorMult(x, y, attractors) {
  minTimeMult = 1;
  for (let i = 0; i < attractors.length; i++) {
    let n = map(
      dist(attractors[i].x, attractors[i].y, x, y),
      attractors[i].fieldSize - 0,
      attractors[i].fieldSize + slowdownRadius,
      0,
      1,
      true
    )
    minTimeMult = min(minTimeMult, (n + slowdownConst_r) / (1 + slowdownConst_r));
  }
  return minTimeMult;
}

function onConnect(timeMult) {
  attractorTimer += timeMult * 10;
  if (attractorTimer > attractorTimerTarget)
    attractorTimer = attractorTimerTarget;
}

function onDisconnect() {
  attractorTimer = 0;
}