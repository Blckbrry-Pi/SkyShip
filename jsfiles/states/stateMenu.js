function stateMenu(stateTimer) {
    starStep();
    starryBackground();

    hoveredLevel = levelsDisplayed[getLevelHovered(menuPage)];
    drawLevelIcons(levelsDisplayed, unlocked, menuPage);

    if (unlocked.includes(hoveredLevel)) {
        writeLevelName(levels[hoveredLevel].name);
        if (mouseIsPressed) loadLevel(hoveredLevel);
    }
}


function getLevelHovered(page) {
    let distanceBetween = Math.min(width / 6, height / 3.5);

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
            let targetLocation = new p5.Vector(width / 2, height / 2);
            targetLocation.add(0, distanceBetween / 3.5);
            targetLocation.add((col - 2) * distanceBetween, (row - 1) * distanceBetween);

            let xInBounds = mouseX > targetLocation.x - distanceBetween / 3 && mouseX < targetLocation.x + distanceBetween / 3;

            let yInBounds = mouseY > targetLocation.y - distanceBetween / 3 && mouseY < targetLocation.y + distanceBetween / 3;

            if (xInBounds && yInBounds) return col + row * 5 + page * 15;
        }
    }
    return -1;
}


function drawLevelIcons(levels, unlocked, page) {
    for(let i = page * 15; i < (page + 1) * 15 && i < levels.length; i++)
        drawLevelIcon(levels[i], i % 15, unlocked.includes(levels[i]));
}

function drawLevelIcon(number, position, unlocked) {
    push();
        translate(width / 2, height / 2);

        let column = position % 5;
        let row = Math.floor(position / 5);
        let distanceBetween = Math.min(width / 6, height / 3.5);

        translate(0, distanceBetween / 3.5);

        translate((column - 2) * distanceBetween, (row - 1) * distanceBetween);

        fill(unlocked ? 100 : 80);
        stroke(unlocked ? 255 : 150);
        strokeWeight(3);
        rect(-distanceBetween / 3, -distanceBetween / 3, distanceBetween * 2/3, distanceBetween * 2/3, distanceBetween / 20);


        textAlign(CENTER, CENTER);
        textSize(distanceBetween / 3);
        textFont("Futura");
        fill(unlocked ? 0 : 30)
        text(number + 1, 0, 0);
    pop();
}


function writeLevelName(name) {
    let distanceBetween = Math.min(width / 6, height / 3.5);
    push();
        translate(width/2, height/2 - distanceBetween*1.4);

        textAlign(CENTER, CENTER);
        textSize(distanceBetween / 3);
        textFont("Futura");
        fill(255);
        stroke(0);
        strokeWeight(3);
        text(name, 0, 0);
    pop();
}