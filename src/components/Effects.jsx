import React from "react";
import { useLoader } from "@react-three/fiber";
import { EffectComposer, SSR, Bloom, LUT } from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";

function Effects() {
  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");

  return (
    <>
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={1}
          mipmapBlur
          luminanceSmoothing={0}
          intensity={1.75}
        />
        <LUT lut={texture} />
      </EffectComposer>
    </>
  );
}

export default Effects;
