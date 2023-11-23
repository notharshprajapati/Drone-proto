import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Parts(props) {
  const { nodes, materials } = useGLTF("/assets/models/parts.glb");
  return (
    <group {...props} dispose={null} position={[0, 0, -90]}>
      <group position={[0, -1, -20]}>
        <mesh
          geometry={nodes.part1_1.geometry}
          material={materials["off white"]}
        />
        <mesh
          geometry={nodes.part1_2.geometry}
          material={materials["black.002"]}
        />
        <mesh
          geometry={nodes.cam.geometry}
          material={materials["cam.001"]}
          position={[0, 1, 0]}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[0, 1, 0]}
        />
        <mesh
          geometry={nodes.Cube005.geometry}
          material={nodes.Cube005.material}
          position={[0, 1, 0]}
        />
        <mesh
          geometry={nodes.lens.geometry}
          material={materials["metal.001"]}
          position={[0, 1, 0]}
        />
        <group position={[0, 1, 0]}>
          <mesh
            geometry={nodes.tail_1.geometry}
            material={materials["cam.001"]}
          />
          <mesh
            geometry={nodes.tail_2.geometry}
            material={materials["tail.001"]}
          />
        </group>
      </group>
      <group position={[0, 0, -10]}>
        <mesh
          geometry={nodes.part2_1.geometry}
          material={materials["off white.001"]}
        />
        <mesh geometry={nodes.part2_2.geometry} material={materials.black} />
        <mesh
          geometry={nodes.Cube007.geometry}
          material={nodes.Cube007.material}
        />
        <mesh
          geometry={nodes.motors001.geometry}
          material={materials["metal.001"]}
        />
        <mesh
          geometry={nodes.motors001_1.geometry}
          material={materials["gold.001"]}
        />
        <mesh
          geometry={nodes.wing1001_1.geometry}
          material={materials["fan.001"]}
        />
        <mesh
          geometry={nodes.wing1001_2.geometry}
          material={materials["gold.001"]}
        />
      </group>
      <mesh
        geometry={nodes.part3_1.geometry}
        material={materials["off white.002"]}
      />
      <mesh
        geometry={nodes.part3_2.geometry}
        material={materials["black.001"]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
      />
      <mesh
        geometry={nodes.legs_1.geometry}
        material={materials["metal.001"]}
      />
      <mesh geometry={nodes.legs_2.geometry} material={materials["body.001"]} />
    </group>
  );
}

useGLTF.preload("/assets/models/parts.glb");
