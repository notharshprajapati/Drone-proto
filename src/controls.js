export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.05;
let planeSpeed = 0;
let planeSteer = 0;
let planeHeight = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera) {
  //ease in speed
  planeSpeed *= 0.95;
  planeSteer *= 0.95;
  planeHeight *= 0.95;

  if (Math.abs(planeSpeed) > maxVelocity)
    planeSpeed = Math.sign(planeSpeed) * maxVelocity;

  if (Math.abs(planeSteer) > maxVelocity)
    planeSteer = Math.sign(planeSteer) * maxVelocity;
  if (Math.abs(planeHeight) > maxVelocity)
    planeHeight = Math.sign(planeHeight) * maxVelocity;

  if (controls["w"]) planeSpeed += 0.01;
  if (controls["s"]) planeSpeed -= 0.01;
  if (controls["a"]) planeSteer += 0.01;
  if (controls["d"]) planeSteer -= 0.01;
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

  planePosition.add(z.clone().multiplyScalar(-planeSpeed));
  planePosition.add(x.clone().multiplyScalar(-planeSteer));
  planePosition.add(y.clone().multiplyScalar(-planeHeight));
}
