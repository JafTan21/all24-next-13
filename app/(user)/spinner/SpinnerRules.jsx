import axios from "axios";
import { useEffect, useState } from "react";
import { MdNotificationImportant } from "react-icons/md";
import ErrorHandler from "../../../utils/helpers/ErrorHandler";

export default function SpinnerRules() {
  const [notice, noticeSet] = useState("loading...");

  useEffect(() => {
    axios
      .get("/user/notice?key=spinner")
      .then((res) => {
        noticeSet(res.data.notice);
      })
      .catch(ErrorHandler);
  }, []);

  return (
    <div className="flex items-center justify-center bg-black border-2 border-yellow-400">
      <MdNotificationImportant
        className="text-3xl text-white bg-red-500"
        title="Important"
      />
      <marquee className="text-gray-50">{notice.notice}</marquee>
    </div>
  );
}
