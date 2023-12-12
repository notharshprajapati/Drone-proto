import React from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { Drone } from "./models/Drone";
import { Podium1 } from "./models/Podium1";
import { Pod2 } from "./models/Pod2";
import { PinkForest } from "./models/PinkForest";
import { Forest } from "./models/Forest";
import { Parts } from "./models/Parts";
import { Reflector } from "@react-three/drei";

function App() {
  return (
    <>
      <Drone position={[0, 0.5, 0]} />
      <Ground />
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 10, 0]} intensity={0.3} />
      <directionalLight position={[-50, 0, -40]} intensity={0.7} />
      <Podium1 position={[-2, 0, -10]} rotation={[0, 0.5, 0]} />
      <Pod2 position={[-2, 0.05, -30]} />
      <PinkForest position={[0, -1, -50]} />
      <Forest position={[-1, -1, -70]} />
      <Parts />
    </>
  );
}

export default App;
function Ground() {
  return (
    <Reflector
      scale={[100, 1, 100]}
      blur={[1, 1]}
      resolution={512 * 4}
      args={[10, 10]}
      mirror={1}
      mixBlur={2}
      mixStrength={50}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material color="#111" roughness={0.25} {...props} />
      )}
    </Reflector>
  );
}
