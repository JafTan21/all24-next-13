import React, { useEffect, useState } from "react";
import "./wheel.css";

const useWheel = ({ items }) => {
  const [selectedItem, selectedItemSet] = useState(-1);

  const [spinningTime, spinningTimeSet] = useState(5);

  const [state, stateSet] = useState({
    className: "",
    wheelVars: {
      "--nb-item": items.length,
      "--nb-turn": 5,
      "--spinning-duration": `${spinningTime}s`,
    },
  });

  useEffect(() => {
    if (selectedItem == -1) return;

    stateSet((newState) => ({
      ...newState,
      className: selectedItem != null ? "spinning" : "",
      wheelVars: {
        ...newState.wheelVars,
        "--selected-item": selectedItem,
      },
    }));
  }, [selectedItem]);

  const Wheel = (
    <div className="wheel-container">
      <div style={state.wheelVars} className={`wheel ${state.className}`}>
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ "--item-nb": index }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return {
    Wheel,
    animateTo: (idx) => {
      selectedItemSet(idx);
    },
    startSpin: () => {},
    stopSpin: () => {
      stateSet({ ...state, className: "" });
    },
    spinningTime,
    shouldReset: selectedItem != null && selectedItem != -1,
    reset: () => {
      selectedItemSet(null);
    },
  };
};

export default useWheel;
