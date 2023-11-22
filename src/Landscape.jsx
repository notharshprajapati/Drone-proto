import React from "react";
// import { useTexture } from "@react-three/drei";
// import * as THREE from "three";

export function Landscape(props) {
  // Load the chess texture
  // const chessTexture = useTexture("chess.jpg");

  // Set the texture repeat values to control tiling
  // chessTexture.wrapS = chessTexture.wrapT = THREE.RepeatWrapping;
  // chessTexture.repeat.set(100, 100); // Adjust the values as needed

  return (
    <group {...props} dispose={null}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[100, 100, 100]}
        receiveShadow
      >
        <planeGeometry />
        {/* <meshStandardMaterial map={chessTexture} /> */}
      </mesh>
    </group>
  );
}
