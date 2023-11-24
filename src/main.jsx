import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import App from "./App";
import { KeyboardControls } from "@react-three/drei";

ReactDOM.createRoot(document.getElementById("root")).render(
  <KeyboardControls
    map={[
      { name: "upward", keys: ["KeyW"] },
      { name: "downward", keys: ["KeyS"] },
      { name: "pitchLeft", keys: ["KeyA"] },
      { name: "pitchRight", keys: ["KeyD"] },
      { name: "forward", keys: ["ArrowUp"] },
      { name: "backward", keys: ["ArrowDown"] },
      { name: "leftward", keys: ["ArrowLeft"] },
      { name: "rightward", keys: ["ArrowRight"] },
      { name: "reset", keys: ["KeyR"] },
      { name: "shift", keys: ["Shift"] },
    ]}
  >
    <Canvas shadows>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Canvas>
  </KeyboardControls>
);
