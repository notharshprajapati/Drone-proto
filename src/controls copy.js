export let controls = {};

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.01;
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  //ease in speed
  jawVelocity *= 0.95;
  planeSpeed *= 0.95;
  pitchVelocity *= -0.1;

  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (controls["a"]) jawVelocity += 0.0025;

  if (controls["d"]) jawVelocity -= 0.0025;

  if (controls["w"]) {
    pitchVelocity += 0.01;
    planeSpeed = 0.01;
  }

  if (controls["s"]) {
    planeSpeed = -0.01;
  }
  if (controls.shift) {
    // planeSpeed = 0.01;
  }
  if (controls.control) {
    // planeSpeed = -0.01;
  }

  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    planeSpeed = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 0.1, 0.5);
  }
  console.log(pitchVelocity);
  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed));
}
