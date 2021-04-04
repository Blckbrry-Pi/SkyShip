let drawFunc = undefined;

function preload() {
  import("./sketchInit.js").then(module => module.preload());
}
function setup() {
  import("./sketchInit.js").then(module => module.setup());
}
function draw() {
  if (typeof drawFunc != "function")
    import("./sketchInit.js").then(module => {
      drawFunc = module.draw;
      module.draw();
    });
  else
    drawFunc();
}
