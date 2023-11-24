import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
export function Drone(props) {
  const { nodes, materials } = useGLTF("/assets/models/drone.glb");

  //refs
  const body = useRef();
  const wing1 = useRef();
  const wing2 = useRef();
  const wing3 = useRef();
  const wing4 = useRef();

  //smooth cam variables
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(0, 1.5, 3));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 1.5, 0));
  const [subscribeKeys, getKeys] = useKeyboardControls(); //controller
  let boost = 1;
  useFrame((state, delta) => {
    /**
     * Controls
     */
    const {
      upward,
      downward,
      pitchLeft,
      pitchRight,
      forward,
      backward,
      leftward,
      rightward,
      reset,
      shift,
    } = getKeys();
    if (forward && body.current.position.z > -100) {
      if (body.current.rotation.x > -0.25) body.current.rotation.x -= 0.025;
      body.current.position.z -= 0.1 * boost;
    }

    if (backward && body.current.position.z < 5) {
      if (body.current.rotation.x < 0.25) body.current.rotation.x += 0.025;
      body.current.position.z += 0.1 * boost;
    }
    if (rightward && body.current.position.x < 1) {
      if (body.current.rotation.z > -0.25) body.current.rotation.z -= 0.025;
      body.current.position.x += 0.1;
    }
    if (leftward && body.current.position.x > -1) {
      if (body.current.rotation.z < 0.25) body.current.rotation.z += 0.025;
      body.current.position.x -= 0.1;
    }

    if (upward && body.current.position.y < 5) body.current.position.y += 0.025;
    if (downward && body.current.position.y > 0)
      body.current.position.y -= 0.05;

    if (shift && boost < 2) {
      boost += 0.1;
    } else {
      if (boost > 1) boost -= 0.025;
    }
    if (reset) {
      body.current.rotation.set(0, 0, 0);
      body.current.position.set(0, 0.5, 0);
    }

    if (pitchLeft) body.current.rotation.y += 0.05;
    if (pitchRight) body.current.rotation.y -= 0.05;

    // revert
    if (body.current.rotation.x != 0) {
      if (!forward && body.current.rotation.x < 0)
        body.current.rotation.x += 0.01;
      if (!backward && body.current.rotation.x > 0)
        body.current.rotation.x -= 0.01;
    }
    if (body.current.rotation.z != 0) {
      if (!rightward && body.current.rotation.z < 0)
        body.current.rotation.z += 0.01;
      if (!leftward && body.current.rotation.z > 0)
        body.current.rotation.z -= 0.01;
    }

    /**
     * Camera
     */
    const bodyPosition = body.current.position;

    const radius = 3; // adjust this value based on your scene size
    const angle = body.current.rotation.y;

    const cameraPosition = new THREE.Vector3(
      bodyPosition.x + radius * Math.sin(angle),
      bodyPosition.y + 1,
      bodyPosition.z + radius * Math.cos(angle)
    );

    const cameraTarget = new THREE.Vector3(
      bodyPosition.x,
      bodyPosition.y + 1,
      bodyPosition.z
    );

    smoothedCameraPosition.lerp(cameraPosition, 10 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 10 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);

    /**
     * wing rotation
     */
    if (body.current.position.y > 0) {
      wing1.current.rotation.y += 1;
      wing2.current.rotation.y += 1;
      wing3.current.rotation.y += 1;
      wing4.current.rotation.y += 1;
    }
  });
  return (
    <group {...props} dispose={null} ref={body}>
      <mesh geometry={nodes.body.geometry} material={materials.body} castShadow>
        <mesh
          geometry={nodes.blue.geometry}
          material={materials.blue}
          position={[0, 0.246, -0.165]}
        />
        <mesh geometry={nodes.cam.geometry} material={materials.cam}>
          <mesh
            geometry={nodes.lens.geometry}
            material={materials.metal}
            position={[0, 0.463, 0.199]}
          />
        </mesh>
        <mesh
          geometry={nodes.legs.geometry}
          material={materials.metal}
          position={[0, 0.246, -0.165]}
        />
        <group position={[0, 0.377, -0.024]}>
          <mesh geometry={nodes.motors_1.geometry} material={materials.metal} />
          <mesh geometry={nodes.motors_2.geometry} material={materials.gold} />
          <group position={[0.479, 0.047, -0.4]} ref={wing1}>
            <mesh geometry={nodes.wing1_1.geometry} material={materials.fan} />
            <mesh geometry={nodes.wing1_2.geometry} material={materials.gold} />
          </group>
          <group position={[-0.481, 0.047, -0.4]} ref={wing2}>
            <mesh geometry={nodes.wing2_1.geometry} material={materials.fan} />
            <mesh geometry={nodes.wing2_2.geometry} material={materials.gold} />
          </group>
          <group position={[-0.481, 0.047, 0.4]} ref={wing3}>
            <mesh geometry={nodes.wing3_1.geometry} material={materials.fan} />
            <mesh geometry={nodes.wing3_2.geometry} material={materials.gold} />
          </group>
          <group position={[0.481, 0.047, 0.4]} ref={wing4}>
            <mesh geometry={nodes.wing4_1.geometry} material={materials.fan} />
            <mesh geometry={nodes.wing4_2.geometry} material={materials.gold} />
          </group>
        </group>
        <mesh geometry={nodes.red.geometry} material={materials.red} />
        <mesh geometry={nodes.tail_1.geometry} material={materials.cam} />
        <mesh geometry={nodes.tail_2.geometry} material={materials.tail} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/models/drone.glb");
