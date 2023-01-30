import axios from "axios";
import React from "react";
import { URLs } from "../../../app.config";
import { IGame } from "../../../libs/Models/Game";
import Games from "./Games";
import Notice from "./Notice";

export default async function Home() {
  const notice = await getNotice();
  const games: { [id: number]: IGame } = await getGames();

  return (
    <>
      {/* <Loading /> */}
      <Notice notice={notice} />

      <Games initalGames={games} />
    </>
  );
}

export const revalidate = 0;

const getNotice = async () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = URLs.backend;

  const notice = await axios
    .get("/user/notice", {
      params: {
        key: "notice",
      },
    })
    .then((res) => res.data.notice)
    .catch((err) => {});

  return await notice;
};

const getGames = async () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = URLs.backend;

  return await axios
    .get("/user/game")
    .then((res) => res.data.games)
    .catch((err) => {});
};
