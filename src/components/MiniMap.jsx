import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

function MiniMap() {
  const camRef = useRef();

  const frustumSize = 500;
  const aspect = 1;
  const miniMapLocationLeftPixels = 0;
  const miniMapLocationBottomPixels = 0;
  const viewport = new THREE.Vector4(
    miniMapLocationLeftPixels,
    miniMapLocationBottomPixels,
    window.innerHeight * 0.25,
    window.innerHeight * 0.25
  );

  const scissor = new THREE.Vector4(
    miniMapLocationLeftPixels,
    miniMapLocationBottomPixels,
    window.innerHeight * 0.25,
    window.innerHeight * 0.25
  );

  const [subscribeKeys, getKeys] = useKeyboardControls();
  let speed = 0.1;
  useFrame(({ gl, scene, camera }) => {
    gl.setViewport(0, 0, window.innerWidth, window.innerHeight);
    gl.setScissor(0, 0, window.innerWidth, window.innerHeight);
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();

    // render minicamera
    gl.setViewport(viewport.x, viewport.y, viewport.z, viewport.w);
    gl.setScissor(scissor.x, scissor.y, scissor.z, scissor.w);
    gl.setScissorTest(true);
    const keys = getKeys();
    const {
      pitchLeft,
      pitchRight,
      forward,
      backward,
      leftward,
      rightward,
      reset,
      boost,
    } = keys;

    if (pitchLeft) camRef.current.rotation.z += 0.05;
    if (pitchRight) camRef.current.rotation.z -= 0.05;
    const sinAngle = Math.sin(camRef.current.rotation.z);
    const cosAngle = Math.cos(camRef.current.rotation.z);
    if (forward) {
      camRef.current.position.x -= speed * sinAngle;
      camRef.current.position.z -= speed * cosAngle;
    }
    if (backward) {
      camRef.current.position.x += speed * sinAngle;
      camRef.current.position.z += speed * cosAngle;
    }
    if (leftward) {
      camRef.current.position.x -= speed * cosAngle;
      camRef.current.position.z += speed * sinAngle;
    }
    if (rightward) {
      camRef.current.position.x += speed * cosAngle;
      camRef.current.position.z -= speed * sinAngle;
    }

    // if (boost && speed < 0.25) {
    //   speed += 0.05;
    // } else {
    //   if (speed > 0.1) speed -= 0.05;
    // }

    if (reset) {
      camRef.current.rotation.z = 0;
      camRef.current.position.set(0, 5, 0);
    }

    gl.render(scene, camRef.current);
  }, 1);

  return (
    <>
      <OrthographicCamera
        ref={camRef}
        makeDefault={false}
        zoom={50}
        position={[0, 5, 0]}
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to look downwards
        left={(frustumSize * aspect) / -2}
        right={(frustumSize * aspect) / 2}
        top={frustumSize / 2}
        bottom={frustumSize / -2}
        far={5}
        near={1}
      />
    </>
  );
}

export default MiniMap;
