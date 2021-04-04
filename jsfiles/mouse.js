export class Mouse {
  constructor(translation = new p5.Vector(0, 0), scale = 1) {
    this.translation = translation;
    this.scale = scale;
  }
  
  
  get x() {
    return mouseX / this.scale + this.translation.x
  }
  
  get y() {
    return mouseY / this.scale + this.translation.y
  }
  
  
  setTranslation(translation = createVector(0, 0)) {
    this.translation = translation;
  }
  
  setScale(scale = 1) {
    this.scale = scale;
  }
}