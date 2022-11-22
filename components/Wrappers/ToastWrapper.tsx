import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
