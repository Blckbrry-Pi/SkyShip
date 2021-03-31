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
