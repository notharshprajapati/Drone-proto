import React from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Effects() {
  return (
    <>
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.75} />
      </EffectComposer>
    </>
  );
}

export default Effects;
