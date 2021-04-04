import {states, newState, doStateLoop} from "./jsfiles/states/states.js";
import {addJSONs} from "./jsfiles/levels.js";
import {initStars} from "./jsfiles/backgroundStars.js";

export function preload() {
  for (let i = 0; i < 12; i++) assets.explosion.push(loadImage("images/explosion" + (i + 1) + ".png"))

  fetch('levels.levelData').then(
    res => res.text()
  ).then(
    (levels) => {
      addJSONs(levels);
    }
  ).catch(
    err => console.error(err)
  );
}

export function setup() {
  frameRate(30);
  createCanvas(windowWidth, windowHeight);

  initStars(width * height / 320);

  state = newState(states.menu);

  loadUnlocked();
}

function loadUnlocked() {
  try {
    let unlockedInStorage = JSON.parse(localStorage.getItem('unlockedLevels'));
    if (unlockedInStorage.length === 0) return;

    unlocked = [];

    for (let i = 0; i < unlockedInStorage.length; i++)
      if (levelsDisplayed.includes(unlockedInStorage[i]))
        unlocked.push(unlockedInStorage[i]);
      
    
  }
  catch (e) {}
}


export function draw() {
  doStateLoop(state);
  state.stateTimer++;

  if (!(frameCount % 150)) saveUnlocked();
}

function saveUnlocked() {
  let unlockedInStorage = JSON.parse(localStorage.getItem('unlockedLevels'));

  if (!Array.isArray(unlockedInStorage)) unlockedInStorage = [];

  let unlockedToStorage = [...unlocked];

  for (let i = 0; i < unlockedInStorage.length; i++)
    if (!unlockedToStorage.includes(unlockedInStorage[i]))
      unlockedToStorage.push(unlockedInStorage[i]);
  
  unlockedToStorage.sort((a, b) => a - b);

  localStorage.setItem('unlockedLevels', JSON.stringify(unlockedToStorage));
}