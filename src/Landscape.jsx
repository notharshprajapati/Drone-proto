import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Landscape(props) {
  const chessTexture = useTexture("public/assets/textures/chess.jpg");

  chessTexture.wrapS = chessTexture.wrapT = THREE.RepeatWrapping;
  chessTexture.repeat.set(10, 10); // Adjust the values as needed

  return (
    <group {...props} dispose={null}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[100, 100, 100]}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial map={chessTexture} />
      </mesh>
    </group>
  );
}
