import React from "react";
import { MdNotificationImportant } from "react-icons/md";

export default function Notice({ notice }) {
  return (
    <div className="flex items-center justify-center bg-black  border-yellow-400 border-2">
      <MdNotificationImportant
        className="text-3xl text-white bg-red-500"
        title="Important"
      />
      <marquee className="text-gray-50">{notice}</marquee>
    </div>
  );
}
