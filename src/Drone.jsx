import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Matrix4, Quaternion, Vector3 } from "three";
import { updatePlaneAxis } from "./controls";

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);

export const planePosition = new Vector3(0, 0.1, -5);
const delayedRotMatrix = new Matrix4();

export function Drone(props) {
  const { nodes, materials } = useGLTF("assets/models/drone.glb");

  const groupRef = useRef();
  const fan1 = useRef();
  const fan2 = useRef();
  const fan3 = useRef();
  const fan4 = useRef();

  useFrame(({ camera }) => {
    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    //for the plane
    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix);

    groupRef.current.matrixAutoUpdate = false;
    groupRef.current.matrix.copy(matrix);
    groupRef.current.matrixWorldNeedsUpdate = true;

    //----------------------------------------------------------------------------for the camera
    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )

      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(0))
      .multiply(new Matrix4().makeTranslation(0, 1, 3));
    // .multiply(new Matrix4().makeRotationX(0))
    // .multiply(new Matrix4().makeTranslation(0, 0.46, 0.32));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    //helix
    fan1.current.rotation.y -= 1;
    fan2.current.rotation.y -= 1;
    fan3.current.rotation.y -= 1;
    fan4.current.rotation.y -= 1;
  });
  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        geometry={nodes.Drone.geometry}
        material={materials["black out"]}
        castShadow
        receiveShadow
      >
        {/* camera */}
        <mesh
          geometry={nodes.camBase.geometry}
          material={materials["cam base"]}
          position={[0, 0.437, 0.386]}
        >
          <mesh
            geometry={nodes.body.geometry}
            material={materials["cam out"]}
            position={[0.001, 0.032, 0.005]}
          />
          <mesh
            geometry={nodes.lens.geometry}
            material={materials["cam glass"]}
            position={[0.012, 0.032, -0.115]}
          />
          <mesh geometry={nodes.tail.geometry} material={materials["cam out"]}>
            <mesh
              geometry={nodes.tailLight.geometry}
              material={materials["cam tail"]}
              position={[0.001, 0.09, 0.385]}
            />
          </mesh>
        </mesh>
        <mesh
          geometry={nodes.metal_body.geometry}
          material={materials["metal out"]}
          position={[0, 0.231, -0.203]}
        />
        {/* wings */}
        <mesh
          geometry={nodes.Motor1.geometry}
          material={materials["motor.004"]}
          position={[0.481, 0.331, -0.393]}
        >
          <group position={[0.001, 0.084, 0.002]} ref={fan1}>
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)035"].geometry}
              material={materials["fan gold.004"]}
            />
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)035_1"].geometry}
              material={materials["fan.004"]}
            />
          </group>
        </mesh>
        <mesh
          geometry={nodes.Motor2.geometry}
          material={materials.motor}
          position={[-0.479, 0.331, -0.393]}
        >
          <group position={[0.001, 0.084, 0.002]} ref={fan2}>
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)027"].geometry}
              material={materials["fan gold"]}
            />
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)027_1"].geometry}
              material={materials.fan}
            />
          </group>
        </mesh>
        <mesh
          geometry={nodes.Motor3.geometry}
          material={materials["motor.005"]}
          position={[-0.48, 0.331, 0.408]}
        >
          <group position={[0.001, 0.084, 0.002]} ref={fan3}>
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)037"].geometry}
              material={materials["fan gold.005"]}
            />
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)037_1"].geometry}
              material={materials["fan.005"]}
            />
          </group>
        </mesh>
        <mesh
          geometry={nodes.Motor4.geometry}
          material={materials["motor.006"]}
          position={[0.514, 0.331, 0.408]}
        >
          <group position={[0.001, 0.084, 0.002]} ref={fan4}>
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)039"].geometry}
              material={materials["fan gold.006"]}
            />
            <mesh
              geometry={nodes["Drone_3D_Export_(With_Materials)039_1"].geometry}
              material={materials["fan.006"]}
            />
          </group>
        </mesh>
        <mesh
          geometry={nodes.redLight.geometry}
          material={materials["emi red"]}
          position={[0, 0.322, 0.072]}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("assets/models/drone.glb");
