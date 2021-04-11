import {DirectionalLine} from "./zippers.js"

export class Obstacle {
  constructor(points, obstType = false) {
    this.points = points;
    this.isOuter = obstType;
  }

  pointInObstacle(pointToCheckBounds) {
    if (!pointToCheckBounds instanceof p5.Vector)
      return false;
    
    let intersections = 0;
    let ray2IntersectWith = new DirectionalLine(pointToCheckBounds.x, pointToCheckBounds.y, -10000000, pointToCheckBounds.y);
    for (let i = 0; i < this.points.length; i++) {
      let i2 = (i + 1) % this.points.length;
      let line2CheckIntersect = new DirectionalLine(this.points[i].x, this.points[i].y, this.points[i2].x, this.points[i2].y);
      let intersectionPoint = line2CheckIntersect.calculateLineIntersect(ray2IntersectWith)
      if (intersectionPoint instanceof p5.Vector) {
        if (line2CheckIntersect.pointIsOnLine(intersectionPoint) && intersectionPoint.x <= pointToCheckBounds.x) {
          intersections++;
        }
          
      }
    }
    if (this.isOuter)
      return intersections % 2 - 1 ? true : false
    else
      return intersections % 2 ? true : false
  }
    
  draw(viewScale, viewTranslation) {

    strokeWeight(2);
    stroke(80, 12, 24);
    fill(0, 0);
    this.drawOutline();

    noStroke();
    this.setClipShape();

    this.drawClipRect();
  }
  drawOutline() {
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let onScreenPoint = vectorToScreenVector(this.points[i], viewTranslation, viewScale);
      vertex(onScreenPoint.x, onScreenPoint.y);
    }
    endShape(CLOSE);
  }
  setClipShape() {
    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      addPoint(this.points[i], viewTranslation, viewScale);
    }

    if (this.isOuter) {
      addPoint(this.points[0], viewTranslation, viewScale);

      addPoint(new p5.Vector(-10000, this.points[0].y), viewTranslation, viewScale);

      addPoint(new p5.Vector(-10000,  10000), viewTranslation, viewScale);
      addPoint(new p5.Vector( 10000,  10000), viewTranslation, viewScale);
      addPoint(new p5.Vector( 10000, -10000), viewTranslation, viewScale);
      addPoint(new p5.Vector(-10000, -10000), viewTranslation, viewScale);

      addPoint(new p5.Vector(-10000, this.points[0].y), viewTranslation, viewScale);
    }

    endShape(CLOSE);
  }
  drawClipRect() {
    drawingContext.save();
    drawingContext.clip();
    fill(80, 12, 24, 75);
    rect(-100000, -100000, 200000, 200000);
    drawingContext.restore();
  }
}

function addPoint(pointVector, viewTranslation, viewScale) {
  let onScreenPoint = vectorToScreenVector(pointVector, viewTranslation, viewScale);
  vertex(onScreenPoint.x, onScreenPoint.y);
}

function vectorToScreenVector(pointToMapToScreen, viewTranslation, viewScale) {
  return new p5.Vector(
    (pointToMapToScreen.x - viewTranslation.x) * viewScale,
    (pointToMapToScreen.y - viewTranslation.y) * viewScale,
  );
}