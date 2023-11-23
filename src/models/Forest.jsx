import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Forest(props) {
  const { nodes, materials } = useGLTF("/assets/models/forest.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_1003.geometry} material={materials.water} />
      <mesh
        geometry={nodes.Object_1003_1.geometry}
        material={materials["tree.001"]}
      />
      <mesh
        geometry={nodes.Object_1003_2.geometry}
        material={materials.material}
      />
      <mesh
        geometry={nodes.Object_1003_3.geometry}
        material={materials[".003"]}
      />
      <mesh geometry={nodes.Object_1003_4.geometry} material={materials.line} />
      <mesh geometry={nodes.Object_1003_5.geometry} material={materials.tree} />
      <mesh geometry={nodes.Object_1003_6.geometry} material={materials.road} />
      <group position={[-1, 0, 0]}>
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials["off white"]}
        />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials.black} />
      </group>
      <group
        position={[3.287, 3.151, 4.307]}
        rotation={[-Math.PI, 0.348, -Math.PI]}
      >
        <mesh geometry={nodes.Drone.geometry} material={materials.body} />
        <mesh geometry={nodes.Drone_1.geometry} material={materials.blue} />
        <mesh geometry={nodes.Drone_2.geometry} material={materials.cam} />
        <mesh geometry={nodes.Drone_3.geometry} material={materials.metal} />
        <mesh geometry={nodes.Drone_4.geometry} material={materials.red} />
        <mesh geometry={nodes.Drone_5.geometry} material={materials.tail} />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/forest.glb");
