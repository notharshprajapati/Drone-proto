import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import App from "./App";
import { KeyboardControls } from "@react-three/drei";
import Interface from "./Interface";
import { Fog } from "three";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  HueSaturation,
  Noise,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

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
      { name: "boost", keys: ["Shift"] },
    ]}
  >
    <Canvas
      shadows
      camera={{ position: [0, 0, 10] }}
      onCreated={(state) => {
        state.gl.setClearColor("#a0a6d4");
        state.scene.fog = new Fog("#a0a6d4", 1, 20);
      }}
    >
      <Suspense fallback={null}>
        <App />
      </Suspense>
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={216} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
        <ChromaticAberration
          opacity={0.2}
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.001, 0.001]} // color offset
        />
        <Scanline
          opacity={0.2}
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={2} // scanline density
        />
      </EffectComposer>
    </Canvas>
    <Interface />
  </KeyboardControls>
);
