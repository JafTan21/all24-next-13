import React, { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "./SpinnerContext";

export const SpinnerAnimation = React.memo(() => {
  const { disabled, win_number, loading } = useContext(SpinnerContext);
  const [animationStage, animationStageSet] = useState(1); //(1 | 2 | 3 | 4 | 5 | 6)

  const [spinning] = useState(new Audio("/assets/spinner/spinning.mp3"));

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (disabled) {
      spinning.play();

      interval = setInterval(() => {
        animationStageSet((prev) => {
          //1 - 12
          const animation_time_per_stage = 30 / 12;

          const sec = new Date().getSeconds();
          // sec 2.4 - 4.8->2
          return Math.ceil((sec - 30) / animation_time_per_stage);
        });
      }, 1000);
    } else {
      spinning.pause();
    }

    const restart_roll = () => {
      if (disabled) {
        spinning.currentTime = 0;
        spinning.play();
      }
    };

    spinning.addEventListener("ended", restart_roll);

    return () => {
      interval && clearInterval(interval);
      spinning.removeEventListener("ended", restart_roll);
      spinning.pause();
    };
  }, [disabled]);

  return (
    <div className="flex flex-col items-center justify-center p-5 mx-auto rounded-full">
      <img
        src="/assets/spinner/point.png"
        style={{
          height: 50,
          width: 50,
          zIndex: 1,
        }}
      />
      <div className="mb-5 -mt-5 overflow-hidden rounded-full">
        <img
          style={{
            width: "250px",
            maxWidth: "100%",
            transition: "ease-in-out .4s",
            transform: `rotate(${360 / 15 - (360 / 15) * win_number}deg)`,
          }}
          src="/assets/spinner/spinner.png"
          className={
            "rounded-full " +
            (disabled || loading
              ? " spinning spinning-duration-" + animationStage.toString()
              : "")
          }
        />
      </div>

      <span
        className="text-white text-center text-2xl "
        style={{
          zIndex: 1,
          fontFamily: "sans-serif",
        }}
      >
        <p style={{ color: "white" }}> Recent Win</p>
        <b>({win_number})</b>
      </span>
    </div>
  );
});
