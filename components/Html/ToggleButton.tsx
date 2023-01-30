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
  width?: number;
  height?: number;

  inactiveClass?: string;
  activeClass?: string;
}

export default function ToggleButton({
  isActive,
  onClick,
  on,
  off,

  classNames,
  className,
  inactiveClass,
  activeClass,

  label,
  withDiv,
  width,
  height,
}: Props) {
  const content = (
    <>
      {label && <p className="text-gray-900 ml-2">{label}</p>}
      <button
        className={`${
          isActive
            ? activeClass || `bg-blue-500 text-white`
            : inactiveClass || " bg-white text-gray-700 "
        }  px-1 my-[2px] admin-game-btn shadow-lg ${classNames}`}
        onClick={onClick}
        style={{
          transition: "all",
          transitionDuration: "0.1s",
          width: width || "auto",
          height: height || "auto",
        }}
        type="button"
      >
        {isActive ? on : off}
      </button>
    </>
  );

  if (withDiv) {
    return <div className={className}>{content}</div>;
  }

  return content;
}
