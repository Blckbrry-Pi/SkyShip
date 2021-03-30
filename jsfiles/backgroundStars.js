let stars = [];
let starCount;
let starOffs = 0;

function initStars(starCount) {
  for (let i = 0; i < starCount; i++) {
    stars.push(
      {
        dist: sqrt(random() * 2),
        rot: random(TAU),
        strokeWeight: random() * 2.5,
        intensity: random() * random(0, 0.9)
      }
    )
  }
}


function starryBackground() {
  background(0);

  for (let i = 0; i < stars.length; i++) {
    strokeWeight(stars[i].strokeWeight);
    stroke(255, stars[i].intensity * 255);

    let xOffs = cos(stars[i].rot + radians(starOffs)) * stars[i].dist * (width  / 2)
    let yOffs = sin(stars[i].rot + radians(starOffs)) * stars[i].dist * (height / 2)

    point(width / 2 + xOffs, height / 2 + yOffs);
  }
}

function rotateStars(timeMult = 1) {
  starOffs += 0.02 * timeMult;
}