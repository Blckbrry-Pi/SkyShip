let qwerty;

function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);
  
  attractors = [
    new Attractor(   0,   0, 150, 50, true),
    new Attractor(1200, 800, 150, 50, false),
    new Attractor(2400,   0, 150, 50, false),
    new Attractor(3600, 800, 150, 50, true),
  ]
  
  zippers = [
    new Zipper( 140,  -50, 1050,  725, 100, 100, 1),
    new Zipper(1340,  850, 2250,   75, 100, 100, 1),
    new Zipper(2540,  -50, 3450,  725, 100, 100, 1),
    new Zipper(3725,  750, 3725,  300, 100, 100, 1),
    new Zipper(3725,  300, 3500,    0, 100, 100, 4),
    new Zipper(3500, -100, 3200, -300, 100, 100, 4),
    new Zipper(3200, -400, 1000, -400,  100, 100, 4),
    new Zipper(1000, -400,  300, -200,  100, 100, 4),
  ]

  obstacles = [
    new Obstacle([
      new p5.Vector( 300,  -75),
      new p5.Vector(1150,  600),
      new p5.Vector(1200,  800),
      new p5.Vector(1250,  700),
      new p5.Vector(2100,    0),
      new p5.Vector(2200, -150),
      new p5.Vector(2350, -250),
      new p5.Vector(2500, -250),
      new p5.Vector(3625,  725),
      new p5.Vector(3625,  350),
      new p5.Vector(3350, -50),
      new p5.Vector(2975, -300),
      new p5.Vector(1000, -300),
    ])
  ]

  initStars(width * height / 320);
  
  runner = new Runner(-200, 50, 24, -18);

  state = newState(states.flying);
}


function draw() {
  doStateLoop(state);
}

function keyPressed() {
  if (keyCode === 32 || keyCode == 80) {
    isLooping() ? noLoop() : loop();
  }
}