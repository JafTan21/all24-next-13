"use client";

import Image from "next/image";
import React, { ReactElement } from "react";
import { Rings } from "react-loader-spinner";
import icon from "../../assets/favicon.png";

interface Props {
  minimal?: boolean;
}

export default function Loading(props: Props) {
  return (
    <div
      className="animate-pulse"
      style={
        props.minimal
          ? {}
          : {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }
      }
    >
      <Image
        src={icon}
        alt="Loading..."
        className="loading-spin"
        style={{
          height: "100px",
          width: "100px",
          borderRadius: 4,
        }}
      />
    </div>
  );
}

export const Submitting = (): ReactElement => {
  return <Rings ariaLabel="loading-indicator" />;
};
