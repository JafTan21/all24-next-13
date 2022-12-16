import { createContext, useContext, useEffect, useMemo, useState } from "react";
import io, { Socket } from "socket.io-client";

export const WebSocketContext = createContext<{
  socket: Socket | undefined;
}>({
  socket: undefined,
});

export const useWebSocket = () => {
  const { socket } = useContext(WebSocketContext);
  return { socket };
};

export const getFirstSocketForLayout = () => {
  const [socket, socketSet] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:3000/api/socket");
    socketSet(io());
  }, []);

  return { socket };
};
