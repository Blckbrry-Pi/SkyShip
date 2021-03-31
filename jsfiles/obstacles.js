class Obstacle {
    constructor(points) {
        this.points = points;
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
        return intersections % 2 ? true : false
    }
    
    draw() {
        strokeWeight(2);
        stroke(80, 12, 24);
        fill(80, 12, 24, 50);
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            let onScreenPoint = vectorToScreenVector(this.points[i]);
            vertex(onScreenPoint.x, onScreenPoint.y);
        }
        endShape(CLOSE);
    }
}

function vectorToScreenVector(pointToMapToScreen) {
    return new p5.Vector(
        (pointToMapToScreen.x - viewTranslation.x) * viewScale,
        (pointToMapToScreen.y - viewTranslation.y) * viewScale,
    );
}