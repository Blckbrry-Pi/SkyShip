var states = {
  menu:    "Menu",

  start:   "Start",
  flying:  "Flying",
  dead:    "Dead",
  
  restart: "Restart",
};

function newState(stateEnum) {
  return {
    state: stateEnum,
    stateTimer: 0,
  }
}

function doStateLoop(stateToDo) {
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

    default:
      noLoop();
  }
};