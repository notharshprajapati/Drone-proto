import { useKeyboardControls } from "@react-three/drei";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useRef } from "react";

export default function Interface() {
  const time = useRef();

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const upward = useKeyboardControls((state) => state.upward);
  const downward = useKeyboardControls((state) => state.downward);
  const pitchLeft = useKeyboardControls((state) => state.pitchLeft);
  const pitchRight = useKeyboardControls((state) => state.pitchRight);
  const reset = useKeyboardControls((state) => state.reset);
  const boost = useKeyboardControls((state) => state.boost);

  return (
    <div className="interface">
      <div className="cont">
        <div className="controls">
          <div className="raw">
            <div className={`key ${upward ? "active" : ""}`}>W</div>
          </div>
          <div className="raw">
            <div className={`key ${pitchLeft ? "active" : ""}`}>A</div>
            <div className={`key ${downward ? "active" : ""}`}>S</div>
            <div className={`key ${pitchRight ? "active" : ""}`}>D</div>
          </div>
        </div>
        <div className="controls">
          <div className="raw">
            <div className={`key ${boost ? "active" : ""}`}>
              <div className="ltr">Shift</div>
            </div>
          </div>
          <div className="raw">
            <div className={`key ${reset ? "active" : ""}`}>
              <div className="ltr">R</div>
            </div>
            <div className={`key ${reset ? "active" : ""}`}>
              <div className="ltr">F</div>
            </div>
          </div>
        </div>
        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? "active" : ""}`}>
              <FaArrowUp />
            </div>
          </div>
          <div className="raw">
            <div className={`key ${leftward ? "active" : ""}`}>
              <FaArrowLeft />
            </div>
            <div className={`key ${backward ? "active" : ""}`}>
              <FaArrowDown />
            </div>
            <div className={`key ${rightward ? "active" : ""}`}>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
