import React from "react";
import { getStatusText, Status } from "../../libs/Status";

export default function StatusText({ status }: { status: number }) {
  return (
    <span
      className={
        status == Status.Approved || status == Status.Win
          ? "text-green-500"
          : status == Status.Rejected || status == Status.Lose
          ? "text-red-500"
          : "text-blue-400"
      }
    >
      {getStatusText(status)}
    </span>
  );
}
