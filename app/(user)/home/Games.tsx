"use client";

import React, { useMemo, useState } from "react";
import { IGame } from "../../../libs/Models/Game";
import { IoLogoGameControllerB, IoMdFootball } from "react-icons/io";
import { BiTimer } from "react-icons/bi";
import { GiRollingDices } from "react-icons/gi";
import Link from "next/link";
import GameGroup from "./GameGroup";

import LiveIcon from "../../../assets/icons/live.png";
import { Status } from "../../../libs/Status";
import ToastWrapper from "../../../components/Wrappers/ToastWrapper";

export default function Games({
  initalGames,
}: {
  initalGames: { [id: number]: IGame };
}) {
  const [games, gamesSet] = useState(initalGames);
  const [showingAll, showingAllSet] = useState(true);

  const all = useMemo(() => Object.values(games || []), [games]);
  const live = useMemo(
    () => all.filter((game) => game.status == Status.Live),
    [all]
  );
  const upcoming = useMemo(
    () => all.filter((game) => game.status == Status.Upcoming),
    [all]
  );

  return (
    <ToastWrapper>
      <div className="flex py-3 text-white bg-primary">
        <button
          onClick={() => showingAllSet((prev) => !prev)}
          className={
            " mx-2 flex justify-center items-center space-x-1 text-lg" +
            (showingAll ? " border-b-2 border-green-600" : "")
          }
        >
          <IoMdFootball /> <span>Sports</span>
        </button>

        <button
          onClick={() => showingAllSet((prev) => !prev)}
          className={
            " mx-2 flex justify-center items-center space-x-1 text-lg" +
            (!showingAll ? " border-b-2 border-green-600" : "")
          }
        >
          <BiTimer /> <span>Live</span>
        </button>

        <Link
          href="/spinner"
          className="flex items-center justify-center mx-2 space-x-1 text-lg"
        >
          <GiRollingDices /> <span>Spinner</span>
        </Link>

        <Link
          href="/more-games"
          className="flex items-center justify-center mx-2 space-x-1 text-lg"
        >
          <IoLogoGameControllerB /> <span>Games</span>
        </Link>
      </div>

      <div className="flex flex-row justify-center  flex-wrap mt-2">
        <GameGroup name="Live" icon={LiveIcon} games={live} />
        {showingAll && <GameGroup name="Upcoming" games={upcoming} />}
      </div>
    </ToastWrapper>
  );
}
