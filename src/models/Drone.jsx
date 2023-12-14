import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, applyProps } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
export function Drone(props) {
  const { nodes, materials } = useGLTF("/assets/models/drone.glb");
  //emi material

  applyProps(materials.red, {
    emissiveIntensity: 5,
    toneMapped: false,
  });
  applyProps(materials.blue, {
    emissiveIntensity: 5,
    toneMapped: false,
  });
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: "#000", // Set the color of the glass
    metalness: 1,
    roughness: 0.5,
    transparent: true, // Enable transparency
    opacity: 0.9, // Set the opacity level (adjust as needed)
  });

  //refs
  const body = useRef();
  const bodRot = useRef();
  const wing1 = useRef();
  const wing2 = useRef();
  const wing3 = useRef();
  const wing4 = useRef();

  const [view, setView] = useState(2);
  const [trigger, setTrigger] = useState(false);

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
      cam,
      reset,
      boost,
    } = getKeys();

    if (!trigger && cam) setTrigger(true);

    if (trigger && !cam) {
      if (view == 2) setView(0);
      else setView(view + 1);
      setTrigger(false);
    }

    /**
     * Movement
     */
    if (pitchLeft) body.current.rotation.y += 0.05;
    if (pitchRight) body.current.rotation.y -= 0.05;
    const bodSin = Math.sin(body.current.rotation.y);
    const bodCos = Math.cos(body.current.rotation.y);
    if (forward) {
      if (bodRot.current.rotation.x > -0.25) bodRot.current.rotation.x -= 0.025;
      body.current.position.x -= speed * bodSin;
      body.current.position.z -= speed * bodCos;
    }
    if (backward) {
      if (bodRot.current.rotation.x < 0.25) bodRot.current.rotation.x += 0.025;
      body.current.position.x += speed * bodSin;
      body.current.position.z += speed * bodCos;
    }
    if (leftward) {
      if (bodRot.current.rotation.z < 0.25) bodRot.current.rotation.z += 0.025;
      body.current.position.x -= speed * bodCos;
      body.current.position.z += speed * bodSin;
    }
    if (rightward) {
      if (bodRot.current.rotation.z > -0.25) bodRot.current.rotation.z -= 0.025;
      body.current.position.x += speed * bodCos;
      body.current.position.z -= speed * bodSin;
    }
    if (upward && body.current.position.y < 10)
      body.current.position.y += 0.025;
    if (downward && body.current.position.y > 0)
      body.current.position.y -= 0.05;

    // if (boost && speed < 0.25) {
    //   speed += 0.05;
    // } else {
    //   if (speed > 0.1) speed -= 0.05;
    // }

    {
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
    }

    /**
     * Camera
     */
    const bodyPosition = body.current.position;
    const camSin = Math.sin(body.current.rotation.y);
    const camCos = Math.cos(body.current.rotation.y);
    let cameraPosition = new THREE.Vector3();
    let cameraTarget = new THREE.Vector3();

    if (view == 0) {
      cameraPosition = new THREE.Vector3(
        bodyPosition.x + -0.5 * camSin,
        bodyPosition.y,
        bodyPosition.z + -0.5 * camCos
      );

      cameraTarget = new THREE.Vector3(
        bodyPosition.x - 10 * camSin,
        bodyPosition.y,
        bodyPosition.z - 10 * camCos
      );
    } else if (view == 1) {
      cameraPosition = new THREE.Vector3(
        bodyPosition.x + 0.29 * camSin,
        bodyPosition.y + 0.5,
        bodyPosition.z + 0.29 * camCos
      );

      cameraTarget = new THREE.Vector3(
        bodyPosition.x - 10 * camSin,
        bodyPosition.y,
        bodyPosition.z - 10 * camCos
      );
    } else {
      cameraPosition = new THREE.Vector3(
        bodyPosition.x + 3 * camSin,
        bodyPosition.y + 1,
        bodyPosition.z + 3 * camCos
      );
      cameraTarget = new THREE.Vector3(
        bodyPosition.x,
        bodyPosition.y + 1,
        bodyPosition.z
      );
    }

    smoothedCameraPosition.lerp(cameraPosition, 10 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 10 * delta);

    state.camera.position.copy(
      view == 2 ? smoothedCameraPosition : cameraPosition
    );
    state.camera.lookAt(view == 2 ? smoothedCameraTarget : cameraTarget);

    /**
     * wing rotation
     */
    if (body.current.position.y > 0) {
      wing1.current.rotation.y += 1;
      wing2.current.rotation.y += 1;
      wing3.current.rotation.y += 1;
      wing4.current.rotation.y += 1;
    }

    //reset
    if (reset) {
      setView(2);
      speed = 0.1;
      bodRot.current.rotation.set(0, 0, 0);
      body.current.rotation.set(0, 0, 0);
      body.current.position.set(0, 0.5, 0);
    }
  });
  return (
    <group {...props} dispose={null} ref={body}>
      <group ref={bodRot}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.body}
          position={[-0.001, 0.262, 0.127]}
        />
        <mesh
          geometry={nodes.blue.geometry}
          material={materials.blue}
          position={[0, 0.278, -0.117]}
        />
        <group
          scale={view == 2 ? [1, 1, 1] : [0, 0, 0]}
          position={[-0.001, 0.461, 0.254]}
        >
          <mesh geometry={nodes.cam_1.geometry} material={materials.cam} />
          <mesh geometry={nodes.cam_2.geometry} material={materials.metal} />
          <mesh geometry={nodes.cam_3.geometry} material={glassMaterial} />
        </group>
        <mesh
          geometry={nodes.legs.geometry}
          material={materials.metal}
          position={[-0.003, 0.219, -0.248]}
        />
        <group position={[-0.48, 0.308, 0.376]}>
          <mesh geometry={nodes.motors.geometry} material={materials.metal} />
          <mesh geometry={nodes.motors_1.geometry} material={materials.gold} />
        </group>
        <group position={[0.48, 0.423, -0.425]} ref={wing1}>
          <mesh geometry={nodes.wing1_1.geometry} material={materials.fan} />
          <mesh geometry={nodes.wing1_2.geometry} material={materials.gold} />
        </group>
        <group position={[-0.48, 0.424, -0.425]} ref={wing2}>
          <mesh geometry={nodes.wing2_1.geometry} material={materials.fan} />
          <mesh geometry={nodes.wing2_2.geometry} material={materials.gold} />
        </group>
        <group position={[-0.48, 0.424, 0.376]} ref={wing3}>
          <mesh geometry={nodes.wing3_1.geometry} material={materials.fan} />
          <mesh geometry={nodes.wing3_2.geometry} material={materials.gold} />
        </group>
        <group position={[0.481, 0.423, 0.376]} ref={wing4}>
          <mesh geometry={nodes.wing4_1.geometry} material={materials.fan} />
          <mesh geometry={nodes.wing4_2.geometry} material={materials.gold} />
        </group>
        <mesh
          geometry={nodes.red.geometry}
          material={materials.red}
          position={[-0.009, 0.301, -0.003]}
        />
        <group position={[0.48, 0.314, -0.425]}>
          <mesh
            geometry={nodes.motors004.geometry}
            material={materials.metal}
          />
          <mesh
            geometry={nodes.motors004_1.geometry}
            material={materials.gold}
          />
        </group>
        <group position={[-0.48, 0.308, -0.425]}>
          <mesh
            geometry={nodes.motors008.geometry}
            material={materials.metal}
          />
          <mesh
            geometry={nodes.motors008_1.geometry}
            material={materials.gold}
          />
        </group>
        <group position={[0.48, 0.308, 0.376]}>
          <mesh
            geometry={nodes.motors012.geometry}
            material={materials.metal}
          />
          <mesh
            geometry={nodes.motors012_1.geometry}
            material={materials.gold}
          />
        </group>
        <mesh
          geometry={nodes.camBase.geometry}
          material={materials.cam}
          position={[-0.001, 0.461, 0.254]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/drone.glb");
