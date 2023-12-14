import React from "react";
import { Drone } from "./models/Drone";
import Models from "./models";
import Ground from "./models/Ground";
import { PerspectiveCamera } from "@react-three/drei";

function App() {
  return (
    <>
      <PerspectiveCamera makeDefault={true} far={20} near={0.1} />
      <Drone position={[0, 0.5, 0]} />
      <Ground />
      <Models />
      <ambientLight intensity={0.5} />
    </>
  );
}

export default App;
