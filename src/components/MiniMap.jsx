import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

function MiniMap() {
  const miniMapCameraRef = useRef();

  const frustumSize = 500;
  const aspect = window.innerWidth / window.innerHeight;

  const miniMapLocationLeftPixels =
    window.innerWidth - 8 - window.innerWidth * 0.2;
  const miniMapLocationBottomPixels = 8;

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
      window.innerWidth * 0.2,
      window.innerHeight * 0.2
    );
    gl.setScissor(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      window.innerWidth * 0.2,
      window.innerHeight * 0.2
    );
    gl.setScissorTest(true);
    // miniMapCameraRef.current.zoom = camera.zoom;
    miniMapCameraRef.current.position.x = camera.position.x;
    miniMapCameraRef.current.position.y = camera.position.y + 5;
    miniMapCameraRef.current.position.z = camera.position.z - 10;
    miniMapCameraRef.current.aspect = aspect;
    miniMapCameraRef.current.updateMatrixWorld();
    miniMapCameraRef.current.updateProjectionMatrix();
    gl.render(scene, miniMapCameraRef.current);
  }, 1);

  return (
    <>
      <OrthographicCamera
        ref={miniMapCameraRef}
        makeDefault={false}
        zoom={100}
        position={[0, 0, -5]}
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to look downwards
        left={(frustumSize * aspect) / -2}
        right={(frustumSize * aspect) / 2}
        top={frustumSize / 2.1}
        bottom={frustumSize / -2}
        far={1000}
        near={0.1}
      />
    </>
  );
}

export default MiniMap;
