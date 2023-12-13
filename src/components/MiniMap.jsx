import { OrthographicCamera, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

function MiniMap() {
  const camRef = useRef();

  const frustumSize = 500;
  const aspect = 1;
  const miniMapLocationLeftPixels = 0;
  const miniMapLocationBottomPixels = 0;
  const [subscribeKeys, getKeys] = useKeyboardControls();
  let speed = 0.1;
  useFrame(({ gl, scene, camera }) => {
    gl.autoClear = true;
    gl.setViewport(0, 0, window.innerWidth, window.innerHeight);
    gl.setScissor(0, 0, window.innerWidth, window.innerHeight);
    gl.setScissorTest(true);
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();

    // render minicamera
    gl.setViewport(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      window.innerHeight * 0.25,
      window.innerHeight * 0.25
    );
    gl.setScissor(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      window.innerHeight * 0.25,
      window.innerHeight * 0.25
    );
    gl.setScissorTest(true);
    const {
      pitchLeft,
      pitchRight,
      forward,
      backward,
      leftward,
      rightward,
      reset,
      boost,
    } = getKeys();
    if (pitchLeft) camRef.current.rotation.z += 0.05;
    if (pitchRight) camRef.current.rotation.z -= 0.05;
    const angle = camRef.current.rotation.z;
    if (forward) {
      camRef.current.position.x -= speed * Math.sin(angle);
      camRef.current.position.z -= speed * Math.cos(angle);
    }
    if (backward) {
      camRef.current.position.x += speed * Math.sin(angle);
      camRef.current.position.z += speed * Math.cos(angle);
    }
    if (leftward) {
      camRef.current.position.x -= speed * Math.cos(angle);
      camRef.current.position.z += speed * Math.sin(angle);
    }
    if (rightward) {
      camRef.current.position.x += speed * Math.cos(angle);
      camRef.current.position.z -= speed * Math.sin(angle);
    }

    // if (boost && speed < 0.25) {
    //   speed += 0.05;
    // } else {
    //   if (speed > 0.1) speed -= 0.05;
    // }

    if (reset) {
      speed = 0.1;
      camRef.current.rotation.z = 0;
      camRef.current.position.set(0, 5, 0);
    }

    camRef.current.aspect = aspect;
    camRef.current.updateMatrixWorld();
    camRef.current.updateProjectionMatrix();
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
        far={1000}
        near={0.01}
      />
    </>
  );
}

export default MiniMap;
