import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";
import { URLs } from "../app.config";

export const WebSocketContext = createContext<{
  socket: Socket | null;
}>({
  socket: null,
});

export const useWebSocket = () => {
  const { socket } = useContext(WebSocketContext);
  return { socket };
};

export const getFirstSocketForLayout = () => {
  const [socket, socketSet] = useState<Socket | null>(null);

  useEffect(() => {
    try {
      socketSet(io(URLs.socket));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { socket };
};
