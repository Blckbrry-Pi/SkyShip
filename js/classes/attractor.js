export class Attractor {
  constructor(xPos, yPos, fieldRadius, physicalRadius, spinClockwise) {
    this.x = xPos;
    this.y = yPos;
    this.fieldSize = fieldRadius;
    this.physSize = physicalRadius;
    this.rotOffset = 0;
    this.spinDirection = spinClockwise ? 1 : -1;
  }
  
  inRange(shipx, shipy) {
    return dist(shipx, shipy, this.x, this.y) <= this.fieldSize
  }
  
  collided(shipx, shipy) {
    return dist(shipx, shipy, this.x, this.y) <= this.physSize
  }
  
  drawBounds() {
    let screenPos = new p5.Vector(
      (this.x - viewTranslation.x) * viewScale,
      (this.y - viewTranslation.y) * viewScale
    );

    drawingContext.ellipse(screenPos.x, screenPos.y, viewScale * this.fieldSize, viewScale * this.fieldSize, 0, 0, TWO_PI);
  }

  draw(viewScale, viewTranslation) {

    let screenPos = new p5.Vector(
      (this.x - viewTranslation.x) * viewScale,
      (this.y - viewTranslation.y) * viewScale
    );

    
    fill(0, 255, 0, 40); noStroke();
    ellipse(screenPos.x, screenPos.y, viewScale * this.fieldSize * 2, viewScale * this.fieldSize * 2);
    
    noFill(); stroke(0, 255, 0, 70); strokeWeight(3);
    dashedEllipse(screenPos.x, screenPos.y, viewScale * this.fieldSize * 2, viewScale * this.fieldSize * 2, 30, 0.5, this.rotOffset);
    
    fill(100); stroke(200); strokeWeight(1);
    spikyCircle(screenPos.x, screenPos.y, viewScale * this.physSize * 4 / 3, viewScale * this.physSize * 2, 8, -this.rotOffset);
  }
  
  rotStep(timeMult = 1) {
    this.rotOffset += 0.1 * this.spinDirection * timeMult;
  }
}

function dashedEllipse(x, y, width, height, steps, duty, offset){
  let perStep = TAU / steps;
  let perStepOn = perStep * duty;
  
  for (let i = 0; i < steps; i++) {
    let start = perStep * i + radians(offset);
    arc(x, y, width, height, start, start + perStepOn);
  }
}

function spikyCircle(x, y, innerDiameter, outerDiameter, spikeCount, offset) {
  let perStep = TAU / spikeCount;
  let innerRadius = innerDiameter / 2;
  let outerRadius = outerDiameter / 2;
  
  beginShape();
  for (let i = 0; i < spikeCount; i++) {
    let innerXOffs = cos(perStep * i + radians(offset)) * innerRadius;
    let innerYOffs = sin(perStep * i + radians(offset)) * innerRadius;
    
    let outerXOffs = cos(perStep * (i + 0.5) + radians(offset)) * outerRadius;
    let outerYOffs = sin(perStep * (i + 0.5) + radians(offset)) * outerRadius;
    
    vertex(x + innerXOffs, y + innerYOffs);
    
    vertex(x + outerXOffs, y + outerYOffs);
  }
  endShape(CLOSE);
  
}