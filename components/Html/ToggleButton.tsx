import React from "react";

interface Props {
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  on: string;
  off: string;
  classNames?: string;
  className?: string;
  label?: string;
  withDiv?: boolean;
}

export default function ToggleButton({
  isActive,
  onClick,
  on,
  off,
  classNames,
  className,
  label,
  withDiv,
}: Props) {
  if (withDiv) {
    return (
      <div className={className}>
        {label && <p className="text-gray-900 ml-2">{label}</p>}
        <button
          className={`${
            isActive ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }  px-1 my-[2px] admin-game-btn shadow-lg ${classNames}`}
          onClick={onClick}
          style={{
            transition: "all",
            transitionDuration: "0.1s",
          }}
          type="button"
        >
          {isActive ? on : off}
        </button>
      </div>
    );
  }

  return (
    <>
      {label && <p className="text-gray-900 ml-2">{label}</p>}
      <button
        className={`${
          isActive ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }  px-1 my-[2px] admin-game-btn shadow-lg ${classNames}`}
        onClick={onClick}
        style={{
          transition: "all",
          transitionDuration: "0.1s",
        }}
        type="button"
      >
        {isActive ? on : off}
      </button>
    </>
  );
}
