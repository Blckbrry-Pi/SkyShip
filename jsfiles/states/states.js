import {stateMenu    } from "./stateMenu.js"    ;

import {stateStart   } from "./stateStart.js"   ;
import {stateFlying  } from "./stateFlying.js"  ;

import {stateDead    } from "./stateDead.js"    ;
import {stateRestart } from "./stateRestart.js" ;

import {stateWin     } from "./stateWin.js"     ;
import {stateContinue} from "./stateContinue.js";


export let states = {
  menu:     "Menu",

  start:    "Start",
  flying:   "Flying",

  dead:     "Dead",
  restart:  "Restart",
  
  win:      "Win",
  continue: "Continue",
};

export function newState(stateEnum) {
  return {
    state: stateEnum,
    stateTimer: 0,
  }
}

export function doStateLoop(stateToDo) {
  switch (stateToDo.state) {
    case states.menu:
      stateMenu(stateToDo.stateTimer);
      break;


    case states.start:
      stateStart(stateToDo.stateTimer);
      break;
    
    case states.flying:
      stateFlying(stateToDo.stateTimer);
      break;
    
      
    case states.dead:
      stateDead(stateToDo.stateTimer);
      break;
  
    case states.restart:
      stateRestart(stateToDo.stateTimer);
      break;


    case states.win:
      stateWin(stateToDo.stateTimer);
      break;

    case states.continue:
      stateContinue(stateToDo.stateTimer);
      break;

    default:
      noLoop();
  }
};