import React from "react";
import { Reflector } from "@react-three/drei";

function Ground() {
  return (
    <>
      <Reflector
        scale={[100, 1, 100]}
        blur={[1, 1]}
        resolution={512 * 4}
        args={[10, 10]}
        mirror={1}
        mixBlur={2}
        mixStrength={50}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        {(Material, props) => (
          <Material color="#111" roughness={0.25} {...props} />
        )}
      </Reflector>
    </>
  );
}

export default Ground;
