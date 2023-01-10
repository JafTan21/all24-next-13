import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

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
      socketSet(io("https://server.gameingserver.xyz"));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { socket };
};
