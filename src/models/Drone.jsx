import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
export function Drone(props) {
  const { nodes, materials } = useGLTF("/assets/models/drone.glb");

  //refs
  const body = useRef();
  const bodRot = useRef();
  const wing1 = useRef();
  const wing2 = useRef();
  const wing3 = useRef();
  const wing4 = useRef();

  //smooth cam variables
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(0, 1.5, 3));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3(0, 1.5, 0));
  const [subscribeKeys, getKeys] = useKeyboardControls(); //controller
  let speed = 0.1;
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
      boost,
    } = getKeys();

    /**
     * Movement
     */

    //forward
    if (forward) {
      //rotation
      if (bodRot.current.rotation.x > -0.25) bodRot.current.rotation.x -= 0.025;
      //movement
      const angle = body.current.rotation.y;
      body.current.position.x -= speed * Math.sin(angle);
      body.current.position.z -= speed * Math.cos(angle);
    }

    //backward
    if (backward) {
      //rotation
      if (bodRot.current.rotation.x < 0.25) bodRot.current.rotation.x += 0.025;
      //movement
      const angle = body.current.rotation.y;
      body.current.position.x += speed * Math.sin(angle);
      body.current.position.z += speed * Math.cos(angle);
    }

    //leftward
    if (leftward) {
      //rotation
      if (bodRot.current.rotation.z < 0.25) bodRot.current.rotation.z += 0.025;
      //movement
      const angle = body.current.rotation.y;
      body.current.position.x -= speed * Math.cos(angle);
      body.current.position.z += speed * Math.sin(angle);
    }

    //rightward
    if (rightward) {
      //rotation
      if (bodRot.current.rotation.z > -0.25) bodRot.current.rotation.z -= 0.025;
      //movement
      const angle = body.current.rotation.y;
      body.current.position.x += speed * Math.cos(angle);
      body.current.position.z -= speed * Math.sin(angle);
    }

    if (upward && body.current.position.y < 5) body.current.position.y += 0.025;
    if (downward && body.current.position.y > 0)
      body.current.position.y -= 0.05;

    if (boost && speed < 0.25) {
      speed += 0.05;
    } else {
      if (speed > 0.1) speed -= 0.05;
    }

    if (reset) {
      bodRot.current.rotation.set(0, 0, 0);
      body.current.rotation.set(0, 0, 0);
      body.current.position.set(0, 0.5, 0);
    }

    if (pitchLeft) body.current.rotation.y += 0.05;
    if (pitchRight) body.current.rotation.y -= 0.05;

    // revert
    if (bodRot.current.rotation.x != 0) {
      if (!forward && bodRot.current.rotation.x < 0)
        bodRot.current.rotation.x += 0.01;
      if (!backward && bodRot.current.rotation.x > 0)
        bodRot.current.rotation.x -= 0.01;
    }
    if (bodRot.current.rotation.z != 0) {
      if (!rightward && bodRot.current.rotation.z < 0)
        bodRot.current.rotation.z += 0.01;
      if (!leftward && bodRot.current.rotation.z > 0)
        bodRot.current.rotation.z -= 0.01;
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
      <group ref={bodRot}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.body}
          castShadow
        >
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
            <mesh
              geometry={nodes.motors_1.geometry}
              material={materials.metal}
            />
            <mesh
              geometry={nodes.motors_2.geometry}
              material={materials.gold}
            />
            <group position={[0.479, 0.047, -0.4]} ref={wing1}>
              <mesh
                geometry={nodes.wing1_1.geometry}
                material={materials.fan}
              />
              <mesh
                geometry={nodes.wing1_2.geometry}
                material={materials.gold}
              />
            </group>
            <group position={[-0.481, 0.047, -0.4]} ref={wing2}>
              <mesh
                geometry={nodes.wing2_1.geometry}
                material={materials.fan}
              />
              <mesh
                geometry={nodes.wing2_2.geometry}
                material={materials.gold}
              />
            </group>
            <group position={[-0.481, 0.047, 0.4]} ref={wing3}>
              <mesh
                geometry={nodes.wing3_1.geometry}
                material={materials.fan}
              />
              <mesh
                geometry={nodes.wing3_2.geometry}
                material={materials.gold}
              />
            </group>
            <group position={[0.481, 0.047, 0.4]} ref={wing4}>
              <mesh
                geometry={nodes.wing4_1.geometry}
                material={materials.fan}
              />
              <mesh
                geometry={nodes.wing4_2.geometry}
                material={materials.gold}
              />
            </group>
          </group>
          <mesh geometry={nodes.red.geometry} material={materials.red} />
          <mesh geometry={nodes.tail_1.geometry} material={materials.cam} />
          <mesh geometry={nodes.tail_2.geometry} material={materials.tail} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/drone.glb");
