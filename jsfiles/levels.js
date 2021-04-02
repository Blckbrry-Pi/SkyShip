var levels = [
  {
    name: "'Round the Bend",
    attractors: [
      new Attractor(   0,   0, 150, 50, true),
    ],

    zippers: [
      new Zipper(-900,  -75, -200,  -75, 100, 100, 1),
      new Zipper(  75,  200,   75,  500, 100, 100, 1),
    ],
    
    obstacles: [
      new Obstacle([
        new p5.Vector( -900,  -175),
        new p5.Vector( -200,  -175),

        new p5.Vector(    0,  -275),
        new p5.Vector(  200,  -175),
        new p5.Vector(  300,     0),
        new p5.Vector(  200,   175),

        new p5.Vector(  175,   200),
        new p5.Vector(  175,   900),
        new p5.Vector(  -25,   900),
        new p5.Vector(  -25,   200),

        new p5.Vector(    0,     0),

        new p5.Vector( -200,    25),
        new p5.Vector( -900,    25),
        new p5.Vector(-1000,   -75),
      ], true)
    ],

    finishLine: new FinishLine(-50, 600, 0, 400, 100),

    runner: new Runner(-900, -75.0001, 10, 0, 20),
  },
  {
    name: "Up and Down and Up Again",
    attractors: [
      new Attractor(   0,   0, 150, 50, true),
      new Attractor(1200, 800, 150, 50, false),
      new Attractor(2400,   0, 150, 50, false),
      new Attractor(3600, 800, 150, 50, true),
    ],
  
    zippers: [
      new Zipper( -75,  900,  -75,  200, 100, 100, 1),
  
      new Zipper( 140,  -50, 1050,  725, 100, 100, 1),
      new Zipper(1340,  850, 2250,   75, 100, 100, 1),
      new Zipper(2540,  -50, 3450,  725, 100, 100, 1),
  
      new Zipper(3725,  750, 3725,  300, 100, 100, 1),
      new Zipper(3725,  300, 3500,    0, 100, 100, 4),
      new Zipper(3500, -100, 3200, -300, 100, 100, 4),
      new Zipper(3200, -400, 1500, -400, 100, 100, 4),
    ],
  
    obstacles: [
      new Obstacle([
        new p5.Vector( -300,     0),
        new p5.Vector( -175,  -175),
        new p5.Vector(  -50,  -250),

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

        new p5.Vector( 1000,  -550),
        new p5.Vector( 3200,  -550),
        new p5.Vector( 3600,  -200),
        new p5.Vector( 3900,   200),
        new p5.Vector( 3900,   800),
        new p5.Vector( 3800,   975),
        new p5.Vector( 3600,  1050),
        new p5.Vector( 3400,   975),
        new p5.Vector( 3300,   800),
        new p5.Vector( 2400,     0),
        new p5.Vector( 2350,   150),
        new p5.Vector( 1300,  1025),
        new p5.Vector( 1100,  1025),
        new p5.Vector( 1000,   925),
        new p5.Vector(  950,   800),
        new p5.Vector(  400,   350),
        new p5.Vector(   50,   250),
        new p5.Vector(   50,   900),
        new p5.Vector(  -75,  1000),
        new p5.Vector( -200,   900),
        new p5.Vector( -200,   250),
      ], true)
    ],
  
    finishLine: new FinishLine(1300, -550, Math.PI * 1/2, 375, 100),

    runner: new Runner(-75, 901, 0, -1, 30)
  }
]

function loadLevel(levelIndex) {
  currentLevel = levelIndex;

  runner     = _.cloneDeep(levels[levelIndex].runner    );
  obstacles  = _.cloneDeep(levels[levelIndex].obstacles );
  zippers    = _.cloneDeep(levels[levelIndex].zippers   );
  attractors = _.cloneDeep(levels[levelIndex].attractors);
  finishLine = _.cloneDeep(levels[levelIndex].finishLine);

  state = newState(states.start);
}
