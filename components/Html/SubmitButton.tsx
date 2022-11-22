import React from "react";
import { TailSpin } from "react-loader-spinner";

interface ISubmitButton {
  isSubmitting: boolean;
  text?: string;
  classNames?: string;
}

export default function SubmitButton({
  isSubmitting,
  text = "Submit",
  classNames = "flex justify-center items-center w-full h-10 mt-6 font-bold transition duration-300 bg-green-600 rounded-3xl text-indigo-50 hover:bg-green-500",
}: ISubmitButton) {
  return (
    <button type="submit" disabled={isSubmitting} className={classNames}>
      {isSubmitting ? (
        <TailSpin height="30" color="white" ariaLabel="loading" />
      ) : (
        text
      )}
    </button>
  );
}
