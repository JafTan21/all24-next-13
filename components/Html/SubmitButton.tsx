import React, { ReactElement } from "react";
import { TailSpin } from "react-loader-spinner";

interface ISubmitButton {
  isSubmitting: boolean;
  text?: string | ReactElement;
  classNames?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function SubmitButton({
  isSubmitting,
  onClick,
  text = "Submit",
  classNames = "flex justify-center items-center w-full min-w-[80px] h-10 mt-6 font-bold transition duration-300 bg-green-600 rounded-3xl text-indigo-50 hover:bg-green-500",
}: ISubmitButton) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={isSubmitting}
      className={classNames}
    >
      {isSubmitting ? (
        <TailSpin height="30" color="white" ariaLabel="loading" />
      ) : (
        text
      )}
    </button>
  );
}
