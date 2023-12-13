import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import App from "./App";
import { KeyboardControls } from "@react-three/drei";
import Effects from "./components/Effects";
import { Stats } from "@react-three/drei";
import { Environment, Lightformer } from "@react-three/drei";
import Interface from "./components/Interface";
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
      { name: "cam", keys: ["KeyF"] },
      { name: "boost", keys: ["Shift"] },
    ]}
  >
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <fog attach="fog" args={["black", 0, 20]} />

      <Environment resolution={512}>
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, -3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 0]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 3]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          position={[0, 4, 9]}
          scale={[10, 1, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-50, 2, 0]}
          scale={[100, 2, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[50, 2, 0]}
          scale={[100, 2, 1]}
        />

        <Lightformer
          form="ring"
          color="red"
          intensity={10}
          scale={2}
          position={[10, 5, 10]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
      <Effects />
      <Suspense fallback={null}>
        <App />
        <Stats />
      </Suspense>
      <MiniMap />
    </Canvas>
    <Interface />
  </KeyboardControls>
);
