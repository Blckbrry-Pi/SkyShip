class DirectionalLine {
  constructor(xS, yS, xE, yE) {
    this.startPoint = new p5.Vector(xS, yS);
    this.endPoint   = new p5.Vector(xE, yE);
  }

  length() {
    return dist(
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.x,
      this.endPoint.y
    );
  }

  isVertical() {
    return this.startPoint.x === this.endPoint.x;
  }

  slope() {
    return (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
  }

  slopeIntFormat() {
    let slope = this.slope();
    let yInt = 0;

    if (this.isVertical())
      yInt = NaN;
    else {
      yInt = this.startPoint.y - (this.startPoint.x) * slope;
    }
    
    return {
      slope: slope,
      yInt: yInt
    };
  }

  pointIsOnLine(pointToCheck) {
    if (!pointToCheck instanceof p5.Vector)
      return false;

    let xAboveLow  = Math.min(this.startPoint.x, this.endPoint.x) <= pointToCheck.x;
    let xBelowHigh = pointToCheck.x <= Math.max(this.startPoint.x, this.endPoint.x);
    let xInRange   = xAboveLow && xBelowHigh;

    let yAboveLow  = Math.min(this.startPoint.y, this.endPoint.y) <= pointToCheck.y
    let yBelowHigh = pointToCheck.y <= Math.max(this.startPoint.y, this.endPoint.y);
    let yInRange   = yAboveLow && yBelowHigh;
    

    let SIF = this.slopeIntFormat();
    
    if (this.isVertical()) {
      SIF.slope = 0;
      SIF.yInt  = pointToCheck.y;
    }

    let onLine = pointToCheck.y === pointToCheck.x * SIF.slope + SIF.yInt;

    return onLine && xInRange && yInRange;
  }

  calculateLineIntersect(otherLine) {
    if (!otherLine instanceof DirectionalLine)
      return false;
    if (!this.length() || !otherLine.length())
      return false;

    let pointOfLineIntersection;

    if (this.isVertical() && otherLine.isVertical())
      return false;
    else if (this.isVertical() || otherLine.isVertical()) {
      if (this.isVertical()) {
        let SIF = otherLine.slopeIntFormat();
        let yCoord = SIF.slope * this.startPoint.x + SIF.yInt;
        pointOfLineIntersection = new p5.Vector(this.startPoint.x, yCoord);
      } else {
        let SIF = this.slopeIntFormat();
        let yCoord = SIF.slope * otherLine.startPoint.x + SIF.yInt;
        pointOfLineIntersection = new p5.Vector(otherLine.startPoint.x, yCoord);
      }
    } else {
      let thisSIF = this.slopeIntFormat();
      let otherSIF = otherLine.slopeIntFormat();

      let xCoord = {
        xCoeff: thisSIF.slope - otherSIF.slope,
        xConst: otherSIF.yInt - thisSIF.yInt,
      }
      if (xCoord.xCoeff == 0) return false;
      xCoord = xCoord.xConst / xCoord.xCoeff;
      let yCoord = thisSIF.slope * xCoord + thisSIF.yInt;

      pointOfLineIntersection = new p5.Vector(xCoord, yCoord);
    }
    return pointOfLineIntersection;
  }

  calculateLineSegIntersect(otherLine) {
    let lineIntersect = this.calculateLineIntersect(otherLine);
    if (lineIntersect === false) return false;

    if (this.pointIsOnLine(lineIntersect) && otherLine.pointIsOnLine(lineIntersect)) return lineIntersect;
    else return false;
  }

  getVector() {
    return new p5.Vector(
      this.endPoint.x - this.startPoint.x,
      this.endPoint.y - this.startPoint.y,
    );
  }

  draw() {
    let startPointScreenPos = new p5.Vector(
      (this.startPoint.x - viewTranslation.x) * viewScale,
      (this.startPoint.y - viewTranslation.y) * viewScale,
    );
    let endPointScreenPos = new p5.Vector(
      (this.endPoint.x - viewTranslation.x) * viewScale,
      (this.endPoint.y - viewTranslation.y) * viewScale,
    );
    line(startPointScreenPos.x, startPointScreenPos.y, endPointScreenPos.x, endPointScreenPos.y);
  }
}

class Zipper {
  constructor(xS, yS, xE, yE, widthOfEffect, attractDistAhead, zipperStrength) {
    this.line = new DirectionalLine(xS, yS, xE, yE);
    this.width = widthOfEffect;
    this.leadingDist = attractDistAhead;
    this.strength = zipperStrength;
  }

  length() {
    return this.line.getVector().mag();
  }

  getPerpThroughPoint(pointIn) {
    if (!pointIn instanceof p5.Vector)
      return false;
    
    if (this.line.isVertical()) {
      return new DirectionalLine(pointIn.x, pointIn.y, this.line.startPoint.x, pointIn.y);
    } else if (this.line.startPoint.y == this.line.endPoint.y) {
      return new DirectionalLine(pointIn.x, pointIn.y, pointIn.x, this.line.startPoint.y);
    } else {
      let origLineSIF = this.line.slopeIntFormat();

      let perpLineSlope = -1 / origLineSIF.slope;

      let perpLineSIF = {
        slope: perpLineSlope,
        yInt: -pointIn.x * perpLineSlope + pointIn.y,
      }

      let perpLineDirLine = new DirectionalLine(0, perpLineSIF.yInt, 100, 100 * perpLineSIF.slope + perpLineSIF.yInt);

      perpLineDirLine.draw();

      let perpLineInterPoint = this.line.calculateLineIntersect(perpLineDirLine);

      return new DirectionalLine(pointIn.x, pointIn.y, perpLineInterPoint.x, perpLineInterPoint.y);
    }
  }

  advanceLine(lineToAdvance) {
    if (!lineToAdvance instanceof DirectionalLine) return;

    let lineVector = this.line.getVector();
    
    lineVector.setMag(this.leadingDist);
    
    lineToAdvance.endPoint.x += lineVector.x;
    lineToAdvance.endPoint.y += lineVector.y;
  }

  draw() {
    let zipperLength = this.length();

    let startPointScreenPos = new p5.Vector(
      (this.line.startPoint.x - viewTranslation.x) * viewScale,
      (this.line.startPoint.y - viewTranslation.y) * viewScale,
    );
    let endPointScreenPos = new p5.Vector(
      (this.line.endPoint.x - viewTranslation.x) * viewScale,
      (this.line.endPoint.y - viewTranslation.y) * viewScale,
    );
    let screenPos = new DirectionalLine(startPointScreenPos.x, startPointScreenPos.y, endPointScreenPos.x, endPointScreenPos.y);

    push();
      translate(screenPos.startPoint);
      push();
        rotate(screenPos.getVector().heading());

        fill(12, 39, 5, 30);
        stroke(38, 89, 21, 0);
        strokeWeight(2);

        rectMode(CENTER);
        for (let i = 1; i > 0; i -= 0.1) {
          let position = new p5.Vector(zipperLength * viewScale / 2, 0);
          let widthHeight = new p5.Vector((zipperLength + this.width * i * 2) * viewScale, this.width * 2 * viewScale * i)

          rect(position.x, position.y, widthHeight.x, widthHeight.y, 50);
        }

        fill(12, 39, 5);
        stroke(38, 89, 21);
        strokeWeight(2);
        for (let i = zipperLength; i > 40; i -= 40) {
          translate(40 * viewScale, 0);
          quad(
              7 * viewScale,  0 * viewScale,
            -14 * viewScale,  7 * viewScale,
            - 7 * viewScale,  0 * viewScale,
            -14 * viewScale, -7 * viewScale
          )
        }
      pop();
    pop();
  }
}