import React from "react";
import { Drone } from "./models/Drone";
import Models from "./models";
import Ground from "./models/Ground";

function App() {
  return (
    <>
      <Drone />
      <Ground />
      <Models />
      <ambientLight intensity={0.5} />
    </>
  );
}

export default App;
