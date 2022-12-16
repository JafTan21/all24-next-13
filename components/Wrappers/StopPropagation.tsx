import React from "react";
import { IChildren } from "../../libs/interfaces";

export default function StopPropagation({
  children,
  className,
}: {
  className?: string;
} & IChildren) {
  return (
    <div onClick={(e) => e.stopPropagation()} className={className}>
      {children}
    </div>
  );
}
