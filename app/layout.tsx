"use client";

import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { getFirstSocketForLayout, WebSocketContext } from "./WebSocket";
import { useMemo } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { socket } = getFirstSocketForLayout();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />
      <body>
        <WebSocketContext.Provider value={{ socket: socket }}>
          {children}
        </WebSocketContext.Provider>
      </body>
    </html>
  );
}
