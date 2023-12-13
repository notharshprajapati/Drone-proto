import React from "react";
import { Podium1 } from "./Podium1";
import { Pod2 } from "./Pod2";
import { PinkForest } from "./PinkForest";
import { Forest } from "./Forest";
import { Parts } from "./Parts";
function Models() {
  return (
    <>
      <Podium1 position={[-2, 0, -10]} rotation={[0, 0.5, 0]} />
      <Pod2 position={[-2, 0.05, -30]} />
      <PinkForest position={[0, -1, -50]} />
      <Forest position={[-1, -1, -70]} />
      <Parts />
    </>
  );
}

export default Models;
