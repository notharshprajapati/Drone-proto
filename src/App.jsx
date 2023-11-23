import React from "react";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { SphereEnv } from "./models/SphereEnv";
import { Landscape } from "./models/Landscape";
import { Drone } from "./models/Drone";
import { Podium1 } from "./models/Podium1";
import { Pod2 } from "./models/Pod2";
import { Ctlrs } from "./Ctrls";

function App() {
  return (
    <>
      <SphereEnv />
      <Environment background={false} files={"assets/textures/envmap.hdr"} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <mesh>
          <sphereBufferGeometry args={[15]} />
          <meshBasicMaterial color="black" side={2} />
        </mesh>
      </PerspectiveCamera>

      <Landscape position={[0, 0, -45]} />
      <Ctlrs />
      <Podium1 position={[-2, 0, -10]} rotation={[0, 0.5, 0]} />
      <Pod2 position={[0, 0.05, -30]} />
      <Drone position={[0, 0.5, 5]} />

      <directionalLight
        castShadow
        color={"#f3d29a"}
        intensity={2}
        position={[10, 5, 4]}
        shadow-bias={-0.0005}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.01}
        shadow-camera-far={20}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6.2}
        shadow-camera-right={6.4}
      />
    </>
  );
}

export default App;
