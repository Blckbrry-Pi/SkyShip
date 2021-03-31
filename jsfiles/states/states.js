var states = {
  start:  "Start",
  flying: "Flying",
  dead:   "Dead",
};

function newState(stateEnum) {
  return {
    state: stateEnum,
    stateTimer: 0,
  }
}

function doStateLoop(stateToDo) {
  switch (stateToDo.state) {
    case states.start:
      stateStart(stateToDo.stateTimer);
      break;
    
    case states.flying:
      stateFlying(stateToDo.stateTimer);
      break;
    
    case states.dead:
      stateDead(stateToDo.stateTimer);
      break;

    default:
      noLoop();
  }
};