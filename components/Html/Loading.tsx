"use client";

import Image from "next/image";
import React, { ReactElement } from "react";
import { Rings } from "react-loader-spinner";
import icon from "../../assets/favicon.png";
import "../styles/loading.scss";

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

const NewLoading = () => {
  return (
    <>
      <div className="relative h-[100px] w-[100px]">
        <div className="w-full h-full bg-primary rounded-full flex-center-center loading-spinning-circle">
          <div className="w-[90%] h-[90%] bg-gray-200 rounded-full"></div>
        </div>
        <div className="bg-primary w-full h-full rounded-full absolute top-0 left-1 logo-loading-animation"></div>
        <div
          className="h-full w-full absolute top-0 left-[20%] text-center"
          style={{
            fontSize: 60,
            fontWeight: 800,
            textShadow: "1px 1px 3px black, 2px 2px 2px #081d36",
            color: "#e5e5e5",
          }}
        >
          24
        </div>
      </div>
    </>
  );
};
