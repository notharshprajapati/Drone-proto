export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});
export let handleKeyDown = {};
window.addEventListener("keydown", handleKeyDown);
export let handleKeyUp = {};
window.addEventListener("keyup", handleKeyUp);

let maxVelocity = 0.05;
let pitchVelocity = 0;
let jawVelocity = 0;
let planeSpeed = 0;
let planeSteer = 0;
let planeHeight = 0;
let wKeyPressed = false;
let sKeyPressed = false;
let aKeyPressed = false;
let dKeyPressed = false;
let tpp = true;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  //ease in speed
  planeSpeed *= 0.95;
  planeSteer *= 0.95;
  planeHeight *= 0.95;
  pitchVelocity *= 0.95;
  jawVelocity *= 0.95;

  if (Math.abs(planeSpeed) > maxVelocity)
    planeSpeed = Math.sign(planeSpeed) * maxVelocity;
  if (Math.abs(planeSteer) > maxVelocity)
    planeSteer = Math.sign(planeSteer) * maxVelocity;
  if (Math.abs(planeHeight) > maxVelocity)
    planeHeight = Math.sign(planeHeight) * maxVelocity;
  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;
  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  window.addEventListener("keydown", (e) => {
    if (e.key === "w" && !wKeyPressed) {
      pitchVelocity = -0.01;
      wKeyPressed = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "w") {
      pitchVelocity = 0.01;
      wKeyPressed = false;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "s" && !sKeyPressed) {
      pitchVelocity = +0.01;
      sKeyPressed = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "s") {
      pitchVelocity = -0.01;
      sKeyPressed = false;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "a" && !wKeyPressed) {
      jawVelocity = 0.01;
      wKeyPressed = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "a") {
      jawVelocity = -0.01;
      wKeyPressed = false;
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "d" && !dKeyPressed) {
      jawVelocity = -0.01;
      dKeyPressed = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "d") {
      jawVelocity = 0.01;
      dKeyPressed = false;
    }
  });

  if (controls["w"]) {
    planeSpeed += 0.01;
    planeHeight -= 0.00057;
  }
  if (controls["s"]) {
    planeSpeed -= 0.01;
    planeHeight -= 0.00058;
  }
  if (controls["a"]) {
    planeSteer += 0.01;
    planeHeight -= 0.000585;
  }
  if (controls["d"]) {
    planeSteer -= 0.01;
    planeHeight -= 0.000585;
  }
  if (controls.shift) planeHeight -= 0.001;
  if (controls.control) planeHeight += 0.001;
  if (controls["r"]) {
    planeSpeed = 0;
    planeSteer = 0;
    planeHeight = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 0.1, -5);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  planePosition.add(z.clone().multiplyScalar(-planeSpeed));
  planePosition.add(x.clone().multiplyScalar(-planeSteer));
  planePosition.add(y.clone().multiplyScalar(-planeHeight));
}
