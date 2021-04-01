function preload() {
  for (let i = 0; i < 12; i++) assets.explosion.push(loadImage("images/explosion" + (i + 1) + ".png"));
}

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);

  initStars(width * height / 320);

  state = newState(states.menu);
}


function draw() {
  doStateLoop(state);
  state.stateTimer++;
}

function keyPressed() {
  if (keyCode === 32 || keyCode == 80) {
    isLooping() ? noLoop() : loop();
  }
}