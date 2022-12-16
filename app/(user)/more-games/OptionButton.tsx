import React from "react";

type Props = {
  name: string;
  setter: (value: string) => void;
  background?: string;
  selected: string;
  total?: number;
  image?: string;
  text_required?: boolean;
};

const OptionButton = ({
  setter,
  name,
  background,
  selected,
  total,
  image,
  text_required,
}: Props) => {
  const get_width_class = () => {
    if (!total) return "w-1/2";

    if (total == 4) return "w-1/4";
    if (total == 8) return "w-1/4";
    if (total == 10) return "w-1/5";

    if (total > 2) {
      return "w-1/3";
    }

    return "w-1/2";
  };

  return (
    <div className={`px-1 py-1 ${get_width_class()}`}>
      <button
        type="button"
        onClick={() => setter(name)}
        className={
          " rounded-lg px-4 py-1.5 w-full shadow-xl first-letter:capitalize text-white text-center flex justify-center items-center  " +
          (selected === name
            ? " border-yellow-700  border-4 bg-blue-400  "
            : background || " bg-transparent ")
        }
      >
        {image && <img className="w-full max-w-[100px]" src={image} />}
        {text_required && <span className={image ? "ml-2" : ""}>{name}</span>}
      </button>
    </div>
  );
};

export default OptionButton;
