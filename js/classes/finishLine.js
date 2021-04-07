export class FinishLine {
    constructor(x, y, rot, w, h) {
        this.pos = new p5.Vector(x, y);
        this.angle = rot;
        this.size = new p5.Vector(w, h);
    }

    draw(viewScale, viewTranslation) {

        push();
            translate((this.pos.x - viewTranslation.x) * viewScale, (this.pos.y - viewTranslation.y) * viewScale);
            push();
                rotate(this.angle);
                fill(255);
                stroke(0);
                rect(0, 0, this.size.x, this.size.y);
                let numAcross = new p5.Vector(Math.floor(this.size.x / 20), Math.floor(this.size.y / 20));
                let eachSize = new p5.Vector(this.size.x / numAcross.x, this.size.y / numAcross.y);

                noStroke();
                fill(0);
                for (let h = 0; h < numAcross.x; h++)
                    for (let v = 0; v < numAcross.y; v++)
                        if ((h + v) % 2)
                            rect(eachSize.x * h, eachSize.y * v, eachSize.x, eachSize.y);
            pop();
        pop();
    }

    pointInLine(pointToCheck) {
        let movedPoint = p5.Vector.sub(pointToCheck, this.pos);
        movedPoint.rotate(-this.angle);

        let xInBounds = 0 < movedPoint.x && movedPoint.x < this.size.x;
        let yInBounds = 0 < movedPoint.y && movedPoint.y < this.size.y;

        return xInBounds && yInBounds;
    }
}