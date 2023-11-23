import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function Landscape(props) {
  const chessTexture = useTexture("/assets/textures/chess.jpg");

  chessTexture.wrapS = chessTexture.wrapT = THREE.RepeatWrapping;
  chessTexture.repeat.set(10, 20); // Adjust the values as needed

  return (
    <group {...props} dispose={null}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={[100, 200, 1]}
        receiveShadow
        tranparent={true}
      >
        <planeGeometry />
        <meshStandardMaterial map={chessTexture} />
      </mesh>
    </group>
  );
}
