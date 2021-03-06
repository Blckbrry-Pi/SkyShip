import {DirectionalLine} from "./zippers.js";
import {attractorTimer} from "../extraFunctions/time.js";

const zipperStrength = 0.05;

export class Runner {
  constructor(xPos, yPos, xVel = 0, yVel = 0, targetVel) {
    this.pos = new p5.Vector(xPos, yPos);
    this.vel = new p5.Vector(xVel, yVel);
    this.targetVelMag = targetVel;
    this.connectedAttractor = {
      index: -1,
      springLen: -1,
      pos: new p5.Vector(0, 0),
    };
  }
  
  draw(inGame, viewScale, viewTranslation) {

    if (inGame) {
      for (let i = 0; i < attractors.length; i++) {
        if (attractors[i].inRange(this.pos.x, this.pos.y)) {
          let springLine = new DirectionalLine(this.pos.x, this.pos.y, attractors[i].x, attractors[i].y);

          let strokeTransp = (attractors[i].fieldSize - dist(this.pos.x, this.pos.y, attractors[i].x, attractors[i].y)) * 10

          stroke(50, strokeTransp);
          strokeWeight(3);
          drawingContext.setLineDash([5, 15]);
          springLine.draw(viewScale, viewTranslation);

          drawingContext.setLineDash([]);
        }
      }

      if (this.connectedAttractor.index !== -1) {
        let springLine = new DirectionalLine(this.pos.x, this.pos.y, this.connectedAttractor.pos.x, this.connectedAttractor.pos.y);
        stroke(0, 255, 0, attractorTimer * 3);
        strokeWeight(4);
        springLine.draw(viewScale, viewTranslation)
      }
    }
    
    push();
      translate((this.pos.x - viewTranslation.x) * viewScale, (this.pos.y - viewTranslation.y) * viewScale);
      push();
        rotate(atan2(this.vel.y, this.vel.x) - HALF_PI);
        stroke(255);
        strokeWeight(1);
        fill(100);
        quad(
            0 * viewScale,  10 * viewScale,
           10 * viewScale, -20 * viewScale,
            0 * viewScale, -10 * viewScale,
          -10 * viewScale, -20 * viewScale
        )
      pop();
    pop();
  }
  
  doPhysicsStep(attractors, zippers, timeMult = 1) {
    if (this.connectedAttractor.index != -1) {
      this.doSpringPhysics(attractors, timeMult);
    }
    let zipperVector = this.getZipperVector(zippers, timeMult);
    zipperVector.mult(7000);

    let oldMag = this.vel.mag();

    this.vel = p5.Vector.lerp(this.vel, zipperVector, zipperStrength);

    this.vel = this.vel.setMag(
      lerp(
        oldMag,
        this.targetVelMag,
        0.04 * timeMult
      )
    )

    this.pos.x += this.vel.x * timeMult;
    this.pos.y += this.vel.y * timeMult;
  }
  
  getZipperVector(zippers, timeMult) {
    let totalZipperVec = new p5.Vector();

    for (let i = 0; i < zippers.length; i++) {

      if (zippers[i].pointInRange(this.pos)) {
        let currZipperDirLine = zippers[i].getPerpThroughPoint(this.pos);
        zippers[i].advanceLine(currZipperDirLine);

        let currZipperVec = currZipperDirLine.getVector();
        currZipperVec.setMag(1 / currZipperVec.mag());
        currZipperVec.mult(zippers[0].strength)
        totalZipperVec.add(currZipperVec);
      }
    }
    return totalZipperVec;
  }

  doSpringPhysics(attractors, timeMult) {
    this.connectedAttractor.pos.x = attractors[this.connectedAttractor.index].x
    this.connectedAttractor.pos.y = attractors[this.connectedAttractor.index].y
    
    let attractorXPos = this.connectedAttractor.pos.x;
    let attractorYPos = this.connectedAttractor.pos.y;
    
    
    let targetLen = this.connectedAttractor.springLen;
    let len = dist(this.pos.x, this.pos.y, attractorXPos, attractorYPos);
    let lenDiff = len - targetLen;
    
    let k = 10 / (targetLen);
    let dampSpring = 0.9;
    
    
    let attractorAngle = atan2(
      this.pos.y - attractorYPos,
      this.pos.x - attractorXPos
    );
    
    let forwardAngle = atan2(
      this.vel.y,
      this.vel.x
    );
    
    let angleDiff = (attractorAngle - forwardAngle + TAU) % PI - HALF_PI;
    
    let newAngleDiff = angleDiff * (1 - dampSpring);
    
    
    this.vel.rotate(newAngleDiff);
    
    
    
    
    let vector = new p5.Vector(attractorXPos - this.pos.x, attractorYPos - this.pos.y);
    
    vector.setMag(lenDiff);
    
    stroke(255);
    strokeWeight(1);
    //line(this.x, this.y, this.x + vector.x, this.y + vector.y);
    
    let springForceX = k*(vector.x);
    let springForceY = k*(vector.y);
    
    this.vel.x += springForceX * timeMult;
    this.vel.y += springForceY * timeMult;
    
    
  }
  
  updateSpringLength(timeMult) {
    if (this.connectedAttractor.index != -1) {
//      this.connectedAttractor.springLen -= 1 * timeMult;
    }
  }
  
  onMouseDown(attractors) {
    for (let i = 0; i < attractors.length; i++) {
      if (attractors[i].inRange(this.pos.x, this.pos.y)) {
        if (attractors[i].inRange(globalMouse.x, globalMouse.y)) {
          this.connectedAttractor = {
            index: i,
            springLen: dist(attractors[i].x, attractors[i].y, this.pos.x, this.pos.y),
            pos: this.connectedAttractor.pos,
          };
          break;
        }
      }
    }
  }
  
  onMouseRelease(attractors) {
    this.connectedAttractor = {
      index: -1,
      springLen: -1,
      pos: createVector(0, 0),
    };
  }
}