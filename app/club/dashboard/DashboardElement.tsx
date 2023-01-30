import { ReactElement, useMemo } from "react";

export const DashboardElement = (props: {
  icon: ReactElement;
  text: string;
  value: string | number;
}) => {
  const getRandomBg = useMemo(() => {
    const options = [
      "bg-red-200",

      "bg-blue-200",

      "bg-orange-200",

      "bg-cyan-200",

      "bg-violet-200",

      "bg-rose-200",

      "bg-green-200",

      "bg-yellow-200",
    ];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  const getRandomCol = useMemo(() => {
    const options = [
      "text-red-500",

      "text-blue-500",

      "text-orange-500",

      "text-cyan-500",

      "text-violet-500",

      "text-rose-500",

      "text-green-500",

      "text-yellow-500",
    ];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-3">
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div
            className={`flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl ${getRandomBg} ${getRandomCol}`}
          >
            {props.icon}
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">{props.text}</div>
            <div className="font-bold text-lg">{props.value}</div>
          </div>
        </div>
      </div>
    </>
  );
};
