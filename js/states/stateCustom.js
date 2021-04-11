
import {starStep} from "../extraFunctions/globalFuncs.js";
import {starryBackground} from "../extraFunctions/backgroundStars.js";
import {JSON2Level, levels, loadLevel} from "../extraFunctions/levels.js";
import {states, newState} from "./states.js";

let inputBox;

let distanceBetween;
let editorButtonParams;
let playButtonParams;
let backButtonParams;

export function stateCustom(stateTimer) {
    if (stateTimer === 1) {
        inputBox = createInput();
    }

    distanceBetween = Math.min(width / 6, height / 3.5);
    playButtonParams = {
        x:          width/2 - distanceBetween/2,
        y:          height/2 + distanceBetween*5/6,
        width:      distanceBetween,
        height:     distanceBetween/3,
        rounding:   distanceBetween/20,
        color:      color(100),
        stroke:     color(255),
        message:    "Play level",
        messSize:   distanceBetween/6,
        messColor:  color(0),
        messStroke: color(255),
    }
    editorButtonParams = {
        x:          width/2 - distanceBetween/2,
        y:          height/2 - distanceBetween*5/6,
        width:      distanceBetween,
        height:     distanceBetween/3,
        rounding:   distanceBetween/20,
        color:      color(100),
        stroke:     color(255),
        message:    "Level editor",
        messSize:   distanceBetween/6,
        messColor:  color(0),
        messStroke: color(255),
    }
    backButtonParams = {
        x:          distanceBetween/3,
        y:          distanceBetween/3,
        width:      distanceBetween*2/3,
        height:     distanceBetween/3,
        rounding:   distanceBetween/20,
        color:      color(100),
        stroke:     color(255),
        message:    "Back",
        messSize:   distanceBetween/6,
        messColor:  color(0),
        messStroke: color(255),
    }


    customDraw();

    let playIsPressed = customButtonHovered(
        playButtonParams.x,     playButtonParams.y,
        playButtonParams.width, playButtonParams.height,
    );
    let editorIsPressed = customButtonHovered(
        editorButtonParams.x,     editorButtonParams.y,
        editorButtonParams.width, editorButtonParams.height,
    );
    let backIsPressed = customButtonHovered(
        backButtonParams.x,     backButtonParams.y,
        backButtonParams.width, backButtonParams.height,
    );
    if (backIsPressed && mouseIsPressed && !mouseWasPressed) {
        state = newState(states.menu);
        inputBox.remove();
    }
    if (playIsPressed && mouseIsPressed && !mouseWasPressed) {
        try {
            levels.push(JSON2Level(inputBox.value()));
            loadLevel(levels.length - 1);
            isCustomLevel = true;
            inputBox.remove();
        }
        catch(e) {
            console.error(e);
        }
    }
    if (editorIsPressed && mouseIsPressed && !mouseWasPressed) {
        let openWindowFunction = function() {
            window.open("../SkyShip-level-editor");
            document.getElementById("defaultCanvas0").removeEventListener(
                "click", 
                openWindowFunction,
            );
        }
        document.getElementById("defaultCanvas0").addEventListener(
            "click", 
            openWindowFunction,
        );
        console.log()
    }
    mouseWasPressed = mouseIsPressed;
}

function customDraw() {
    starStep();
    starryBackground();

    inputBox.size(width / 3);
    inputBox.position(width / 3, height / 2);

    drawCustomButton(
        editorButtonParams.x,         editorButtonParams.y,
        editorButtonParams.width,     editorButtonParams.height,
        editorButtonParams.rounding,
        editorButtonParams.color,     editorButtonParams.stroke,
        editorButtonParams.message,   editorButtonParams.messSize,
        editorButtonParams.messColor, editorButtonParams.messStroke,
    );
    drawCustomButton(
        playButtonParams.x,         playButtonParams.y,
        playButtonParams.width,     playButtonParams.height,
        playButtonParams.rounding,
        playButtonParams.color,     playButtonParams.stroke,
        playButtonParams.message,   playButtonParams.messSize,
        playButtonParams.messColor, playButtonParams.messStroke,
    );
    drawCustomButton(
        backButtonParams.x,         backButtonParams.y,
        backButtonParams.width,     backButtonParams.height,
        backButtonParams.rounding,
        backButtonParams.color,     backButtonParams.stroke,
        backButtonParams.message,   backButtonParams.messSize,
        backButtonParams.messColor, backButtonParams.messStroke,
    );
}

function drawCustomButton(x, y, width, height, rounding, color, strokeColor, mess, messSize, messColor, messStroke) {
    push();
        translate(x, y);

        fill(color);
        stroke(strokeColor);
        strokeWeight(2);
        rect(0, 0, width, height, rounding);

        translate(width/2, height/2)
        textAlign(CENTER, CENTER);
        textSize(messSize);
        textFont("Futura");
        fill(messColor);
        stroke(messStroke);
        strokeWeight(2);
        text(mess, 0, 0)
    pop();
}

function customButtonHovered(x, y, width, height) {
    let mousePos = new p5.Vector(mouseX, mouseY);
    
    mousePos.sub(new p5.Vector(x, y));
    
    let xInBounds = 0 < mousePos.x && mousePos.x < width;
    let yInBounds = 0 < mousePos.y && mousePos.y < height;

    return xInBounds && yInBounds;
}