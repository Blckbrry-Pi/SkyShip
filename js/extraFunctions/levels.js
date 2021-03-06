import {Attractor } from "../classes/attractor.js" ;
import {Zipper    } from "../classes/zippers.js"   ;
import {Obstacle  } from "../classes/obstacles.js" ;
import {Runner    } from "../classes/runner.js"    ;
import {FinishLine} from "../classes/finishLine.js";

import {states, newState} from "../states/states.js";


export var levels = [];

export function addJSONs(levelsString) {
  let splitString = levelsString.split("\n");

  splitString.forEach(
    levelJSON => {
      levels.push(JSON2Level(levelJSON));
    }
  );
}

export function JSON2Level(levelString) {
  let level = JSON.parse(levelString);

  for (let i = 0; i < level.attractors.length; i++) {
    let currA = level.attractors[i];
    level.attractors[i] = new Attractor(
      currA.x,
      currA.y,
      currA.fieldSize,
      currA.physSize,
      currA.spinDirection == 1,
    );
  }

  for (let i = 0; i < level.zippers.length; i++) {
    let currZ = level.zippers[i];
    level.zippers[i] = new Zipper(
      currZ.line.startPoint.x,
      currZ.line.startPoint.y,
      currZ.line.endPoint.x,
      currZ.line.endPoint.y,
      currZ.width,
      currZ.leadingDist,
      currZ.strength,
    );
  }

  for (let i = 0; i < level.obstacles.length; i++) {
    let currO = level.obstacles[i];

    let pointList = [];
    for (let j = 0; j < currO.points.length; j++) {
      let currO_currP = currO.points[j];
      pointList.push(new p5.Vector(currO_currP.x, currO_currP.y));
    }

    level.obstacles[i] = new Obstacle(
      pointList,
      currO.isOuter,
    );
  }
  
  let oldFL = level.finishLine;
  level.finishLine = new FinishLine(oldFL.pos.x, oldFL.pos.y, oldFL.angle, oldFL.size.x, oldFL.size.y);

  let oldR = level.runner;
  level.runner = new Runner(oldR.pos.x, oldR.pos.y, oldR.vel.x, oldR.vel.y, oldR.targetVelMag);

  return level;
}



export function loadLevel(levelIndex) {
  currentLevel = levelIndex;

  runner     = _.cloneDeep(levels[levelIndex].runner    );
  obstacles  = _.cloneDeep(levels[levelIndex].obstacles );
  zippers    = _.cloneDeep(levels[levelIndex].zippers   );
  attractors = _.cloneDeep(levels[levelIndex].attractors);
  finishLine = _.cloneDeep(levels[levelIndex].finishLine);

  state = newState(states.start);
}
