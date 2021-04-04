let attractorTimer = 0;
const attractorTimerTarget = 100;

const slowdownRadius = 150;
const slowdownConst_r = 2 / 2;

const slowdownConst_c = 1 / 2;


export function getTimeMult(x, y, attractors) {
  return lerp(
    nearAttractorMult(x, y, attractors),
    slowdownConst_c / (1 + slowdownConst_c),
    attractorTimer / attractorTimerTarget
  );
}

function nearAttractorMult(x, y, attractors) {
  let minTimeMult = 1;
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

export function onConnect(timeMult) {
  attractorTimer += timeMult * 10;
  if (attractorTimer > attractorTimerTarget)
    attractorTimer = attractorTimerTarget;
}

export function onDisconnect(timeMult) {
  attractorTimer -= 20;
  if (attractorTimer < 0)
    attractorTimer = 0;
}