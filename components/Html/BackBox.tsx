import Link from "next/link";
import React, { ReactElement } from "react";
import { ReactNode } from "react";
import { AiOutlineClose, AiOutlineLeft } from "react-icons/ai";

interface IBackBox {
  title: string;
  children: ReactNode;
  className?: string;
  onBackButtonClick?: () => void;
}

export default function BackBox({
  title,
  children,
  className,
  onBackButtonClick,
}: IBackBox) {
  return (
    <div
      className={`overflow-hidden bg-white mx-auto  border  w-full md:w-4/5 ${className}`}
    >
      <div
        style={{
          background: "#edf1f3",
        }}
        className="flex justify-between p-2 items-center text-xl text-center text-gray-800"
      >
        <Link href={"/"} onClick={onBackButtonClick}>
          <AiOutlineLeft />
        </Link>
        <p>{title}</p>
        <button onClick={onBackButtonClick}>
          {onBackButtonClick && <AiOutlineClose />}
        </button>
      </div>
      <div className={`bg-white ${!onBackButtonClick ? "p-4" : ""}`}>
        {children}
      </div>
    </div>
  );
}
