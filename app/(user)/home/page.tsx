import React, { cache } from "react";
import moment from "moment";

import Notice from "./Notice";
import axios from "axios";
import { URLs } from "../../../app.config";
import Games from "./Games";
import { IGame } from "../../../libs/Models/Game";
import ToastWrapper from "../../../components/Wrappers/ToastWrapper";

// const getNotice = async () => {
//   axios.defaults.withCredentials = true;
//   axios.defaults.baseURL = URLs.backend;

//   const notice = await axios
//     .get("/user/notice", {
//       params: {
//         key: "notice",
//       },
//     })
//     .then((res) => res.data.notice)
//     .catch((err) => console.log(err));

//   return await notice;
// };

// const getGames = async () => {
//   axios.defaults.withCredentials = true;
//   axios.defaults.baseURL = URLs.backend;

//   return await axios
//     .get("/user/game", {
//       params: {
//         key: "notice",
//       },
//     })
//     .then((res) => res.data.games)
//     .catch((err) => console.log(err));
// };

export default function Home() {
  // const notice = await getNotice();
  // const games: { [id: number]: IGame } = await getGames();

  return (
    <>
      home page
      {/* <Notice notice={notice} /> */}
      {/* <Games initalGames={games} /> */}
    </>
  );
}
