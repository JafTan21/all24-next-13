import { useContext, useEffect, useState } from "react";
import { WebSocketContext, useWebSocket } from "../../app/WebSocket";
import { IAnswer } from "../../libs/Models/Answer";
import { IGame } from "../../libs/Models/Game";
import { IQuestion } from "../../libs/Models/Question";

type TObj = IGame | IAnswer | IQuestion | any;
export const CheckObjectReadyForSocketUpdate = (
  prev: TObj,
  next: TObj,
  keys: string[]
) => {
  if (
    keys.every((key) => {
      return prev[key] == next[key];
    })
  ) {
    return false;
  }

  return true;
};

const makeSafeData = (obj: TObj, fields: string[]) => {
  const safeObj = { ...obj };
  Object.keys(safeObj).forEach((key) => {
    if (!fields.includes(key)) {
      delete safeObj[key];
    }
  });

  // console.log({
  //   key: "makeSafeData",
  //   obj,
  //   safeObj,
  // });

  return safeObj;
};

export const useSocketUpdater = (
  data: TObj,
  fields: string[],
  emitableKey: "update-game" | "update-question" | "update-answer"
) => {
  const { socket } = useWebSocket();
  const [prevData, prevDataSet] = useState(data);

  useEffect(() => {
    if (!socket) return;

    if (CheckObjectReadyForSocketUpdate(prevData, data, fields)) {
      // console.log({
      //   key: "emit: " + emitableKey,
      //   prev: prevData,
      //   data: data,
      // });
      socket.emit(emitableKey, {
        data: makeSafeData(data, fields),
      });
      prevDataSet(data);
    }
  }, [data, socket]);
};

export const useSocketReciever = (
  key: string,
  handler: (data: any) => void
) => {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) return;
    console.log("recieve: " + key);

    socket.on(key, handler);

    return () => {
      socket.removeListener(key, handler);
    };
  }, [socket]);
};
