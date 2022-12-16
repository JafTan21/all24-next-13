import { useContext, useEffect, useState } from "react";
import { SpinnerContext } from "./SpinnerContext";

export const LiveTimer = ({ get_result }: { get_result: Function }) => {
  const { disabledSet, disabled } = useContext(SpinnerContext);
  const [time, timeSet] = useState("");

  useEffect(() => {
    get_result();

    const timer: NodeJS.Timer = setInterval(() => {
      const date = new Date();

      const min = date.getMinutes();
      const sec = date.getSeconds();

      // const is_fifth_min = min % 5 == 0;
      const is_disabled = () => {
        if (min % 2 == 0 && sec >= 30) {
          return true;
        }
        return false;
      };

      const time = 90 - (min % 2 == 0 ? 60 + sec : sec);

      const new_min = Math.floor(time / 60);
      const new_sec = time - new_min * 60;

      if (min % 2 != 0 && sec == 30) {
        // every -30sec of 1,3,5...th min
        get_result();
      }

      disabledSet(is_disabled());
      timeSet(is_disabled() ? "0:" + (new_sec - 30) : new_min + ":" + new_sec);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-center text-white ">
        <div
          style={{ zIndex: 2 }}
          className="bg-red-500 px-3 py-1.5 rounded-md hover:shadow cursor-wait "
        >
          <b>{time}</b>
        </div>
      </div>
    </>
  );
};
