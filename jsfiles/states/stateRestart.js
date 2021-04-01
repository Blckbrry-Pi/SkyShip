const defaultButtonSize = 50;
let buttonHoverIndex;

let buttons = {
  retry: {
    draw: function(size) {
      ellipse(0, 0, size * 2, size * 2);

      let arcRad = size * 9/16;
      let detailSize = size * 1/8;

      strokeWeight(6);
      arc(0, 0, arcRad * 2, arcRad * 2, 0, HALF_PI * 3);
      triangle(0, detailSize-arcRad, 0, -detailSize-arcRad, detailSize * 3/2, -arcRad);
    },
    press: function() {
      loadLevel(currentLevel);
    }
  },
  menu: {
    draw: function(size) {
      ellipse(0, 0, size * 2, size * 2);

      let detailHeight = size * 1/3;
      let detailWidth  = size * 9/16;
      let detailDist   = size * 4/18;

      let currentHeight;

      strokeWeight(6);

      currentHeight = -detailHeight;
      point(-detailWidth, currentHeight);
      line(-detailWidth + detailDist, currentHeight, detailWidth, currentHeight);

      currentHeight = 0;
      point(-detailWidth, currentHeight);
      line(-detailWidth + detailDist, currentHeight, detailWidth, currentHeight);

      currentHeight = detailHeight;
      point(-detailWidth, currentHeight);
      line(-detailWidth + detailDist, currentHeight, detailWidth, currentHeight);
    },
    press: function() {
      state = newState(states.menu);
    }
  },
}

function stateRestart(stateTimer) {
  let totalButtonCount = attributesInObject(buttons);

  buttonHoverIndex = getButtonHoverIndex(totalButtonCount);

  let buttonIndex = 0;
  for(let button in buttons) {
    drawButton(button, buttonIndex, totalButtonCount, constrain(stateTimer * 50, 0, 255));
    if (buttonIndex == buttonHoverIndex && mouseIsPressed) buttons[button].press();
    buttonIndex++;
  }


}

function attributesInObject(object) {
  var length = 0;
  for(var _ in object) length++;
  return length;
}

function getButtonHoverIndex(buttonCount) {
  for (let i = 0; i < buttonCount; i++) {
    buttonCenter = new p5.Vector(width/2, height/2);
    buttonCenter.add(-(buttonCount - 1) * defaultButtonSize * 2, 0);
    buttonCenter.add(i * defaultButtonSize * 4, 0);
    if (dist(buttonCenter.x, buttonCenter.y, mouseX, mouseY) < defaultButtonSize) return i;
  }
  return -1;
}

function drawButton(button, ind, buttonCount, opacity) {
  fill(100, opacity);
  stroke(255, opacity);
  strokeWeight(3);

  push();
    translate(width / 2, height / 2);
    translate(-(buttonCount - 1) * defaultButtonSize * 2, 0);
    translate(ind * defaultButtonSize * 4, 0);
    buttons[button].draw(defaultButtonSize);
  pop();
}