import {attributesInObject, getButtonHoverIndex, drawButton} from "../extraFunctions/globalFuncs.js";
import {loadLevel} from "../extraFunctions/levels.js";
import {states, newState} from "./states.js";

let buttonHoverIndex;

let restartButtons = {
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
}

export function stateRestart(stateTimer) {
  let totalButtonCount = attributesInObject(restartButtons);

  buttonHoverIndex = getButtonHoverIndex(totalButtonCount);

  let buttonIndex = 0;
  for(let button in restartButtons) {
    drawButton(restartButtons, button, buttonIndex, totalButtonCount, constrain(stateTimer * 50, 0, 255));
    if (buttonIndex == buttonHoverIndex && mouseIsPressed) restartButtons[button].press();
    buttonIndex++;
  }
}