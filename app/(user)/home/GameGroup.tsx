import { StaticImageData } from "next/image";
import React, { useState } from "react";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import Game from "./Game";

export default function GameGroup({
  games,
  icon,
  name,
}: {
  games: IGame[];
  icon?: string | StaticImageData;
  name: string;
}) {
  return (
    <div className="px-1 md:w-1/2 w-full">
      <Collapsible
        time={100}
        text={name}
        icon={icon}
        className="border border-gray-100 "
      >
        {Object.entries(games).map(([id, game]) => {
          return <Game game={game} key={`game-${id}`} />;
        })}
      </Collapsible>
    </div>
  );
}
