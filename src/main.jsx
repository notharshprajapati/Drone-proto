import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import App from "./App";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./components/Interface";
import { Fog } from "three";
import { COLORS } from "./components/colors";
import MiniMap from "./components/MiniMap";

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
      { name: "Cam", keys: ["KeyF"] },
      { name: "boost", keys: ["Shift"] },
    ]}
  >
    <Canvas
      shadows
      camera={{ position: [0, 0, 10] }}
      onCreated={(state) => {
        state.gl.setClearColor(COLORS.orange);
        state.scene.fog = new Fog(COLORS.orange, 1, 20);
      }}
    >
      <Suspense fallback={null}>
        <App />
      </Suspense>
      <MiniMap
        onCreated={(state) => {
          state.gl.setClearColor(COLORS.orange);
          state.scene.fog = new Fog(COLORS.orange, 1, 0);
        }}
      />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
