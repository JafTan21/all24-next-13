import React from "react";
import { BsFileEarmarkRuledFill } from "react-icons/bs";

const Notice = ({ notice }) => {
  return (
    <>
      <div className="flex items-center justify-center bg-black  border-yellow-400 border-2">
        <BsFileEarmarkRuledFill
          className="text-3xl p-1 text-white bg-red-500"
          title="Important"
        />
        <marquee className="text-gray-50">{notice}</marquee>
      </div>
    </>
  );
};

export default React.memo(Notice);
