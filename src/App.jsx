import React from "react";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Drone } from "./models/Drone";
import { Podium1 } from "./models/Podium1";
import { Pod2 } from "./models/Pod2";
import { PinkForest } from "./models/PinkForest";
import { Forest } from "./models/Forest";
import { Parts } from "./models/Parts";
import { Landscape } from "./components/Landscape";

function App() {
  return (
    <>
      <Environment background={false} files={"assets/textures/envmap.hdr"} />
      <Landscape position={[0, 0, -95]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
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
