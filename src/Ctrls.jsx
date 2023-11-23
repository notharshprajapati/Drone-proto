import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Ctlrs(props) {
  const { nodes, materials } = useGLTF("/assets/models/ctrls.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ctrls_1.geometry} material={materials.black} />
      <mesh
        geometry={nodes.ctrls_2.geometry}
        material={materials["off white"]}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/ctrls.glb");
