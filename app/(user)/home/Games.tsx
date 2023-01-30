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
import { IMultibet, MultibetContext } from "./Multibet";
import MultibetButton from "./MultibetButton";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";

export default function Games({
  initalGames,
}: {
  initalGames: { [id: number]: IGame };
}) {
  const [games, gamesSet] = useState(initalGames);
  const [showingAll, showingAllSet] = useState(true);

  useSocketReciever("add-new-game", (data) => {
    gamesSet((prev) => {
      return {
        ...prev,
        [data.id]: data,
      };
    });
  });

  useSocketReciever("change-game-status", (data) => {
    gamesSet((prev) => {
      return {
        ...prev,
        [data.id]: { ...prev[data.id], ...data },
      };
    });
  });

  const [betsForMultibet, betsForMultibetSet] = useState<IMultibet[]>([]);

  const all = useMemo(() => games || [], [games]);

  const live = useMemo(
    () => Object.values(all).filter((game) => game.status == Status.Live),
    [all]
  );
  const upcoming = useMemo(
    () => Object.values(all).filter((game) => game.status == Status.Upcoming),
    [all]
  );

  return (
    <ToastWrapper>
      <div className="flex py-3 text-white bg-primary">
        <button
          onClick={() => showingAllSet(true)}
          className={
            " mx-2 flex justify-center items-center space-x-1 text-lg" +
            (showingAll ? " border-b-2 border-green-600" : "")
          }
        >
          <IoMdFootball /> <span>Sports</span>
        </button>

        <button
          onClick={() => showingAllSet(false)}
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

      <MultibetContext.Provider
        value={{
          betsForMultibetSet,
          betsForMultibet,
        }}
      >
        <div className="flex flex-row justify-center  flex-wrap mt-2">
          <GameGroup name="Live Games" icon={LiveIcon} initialGames={live} />
          {showingAll && <GameGroup name="Upcoming" initialGames={upcoming} />}
        </div>

        <MultibetButton />
      </MultibetContext.Provider>
    </ToastWrapper>
  );
}
