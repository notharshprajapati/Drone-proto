import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Podium1(props) {
  const { nodes, materials } = useGLTF("/assets/models/podium1.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Podium_1.geometry}
        position={[0, 0.2, 0]}
        castShadow
      >
        <meshStandardMaterial attach="material" />
        <group position={[0, 0.3, 0]}>
          <mesh
            geometry={nodes.Body_1.geometry}
            material={materials["off white"]}
            castShadow
          />
          <mesh
            geometry={nodes.Body_2.geometry}
            material={materials["mid grey"]}
          />
          <mesh
            geometry={nodes.remote.geometry}
            material={materials.black}
            position={[0, 1.051, 0.43]}
          />
          <mesh
            geometry={nodes.Vizor.geometry}
            material={materials.black}
            position={[0, 1.64, 0.136]}
          />
        </group>
        <group>
          <mesh
            geometry={nodes["this"].geometry}
            material={materials.black}
            position={[1.097, 2.254, 0]}
          >
            <mesh
              geometry={nodes.Text.geometry}
              material={materials["off white"]}
              position={[0.24, 0.098, 0.017]}
              rotation={[Math.PI / 2, 0.262, 0]}
              scale={[1, 0.538, 1]}
            />
          </mesh>
        </group>
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/models/podium1.glb");
