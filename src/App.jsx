import React from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Landscape } from "./models/Landscape";
import { Drone } from "./models/Drone";
import { Podium1 } from "./models/Podium1";
import { Pod2 } from "./models/Pod2";
import { PinkForest } from "./models/PinkForest";
import { Forest } from "./models/Forest";
import { Parts } from "./models/Parts";

function App() {
  return (
    <>
      <Environment background={false} files={"assets/textures/envmap.hdr"} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <Landscape position={[0, 0, -95]} />
      <Podium1 position={[-2, 0, -10]} rotation={[0, 0.5, 0]} />
      <Pod2 position={[-2, 0.05, -30]} />
      <PinkForest position={[0, -1, -50]} />
      <Forest position={[-1, -1, -70]} />
      <Parts />
      <Drone position={[0, 0.5, 5]} />
    </>
  );
}

export default App;
