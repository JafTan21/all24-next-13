import { StaticImageData } from "next/image";
import React, { useState } from "react";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import Game from "./Game";

export default function GameGroup({
  initialGames,
  icon,
  name,
}: {
  initialGames: IGame[];
  icon?: string | StaticImageData;
  name: string;
}) {
  return (
    <div className="px-1 md:w-1/2 w-full bg-white">
      <Collapsible
        time={100}
        text={name}
        icon={icon}
        className="border border-gray-100 "
      >
        {Object.entries(initialGames).map(([id, game]) => {
          return <Game initialGame={game} key={`game-${id}`} />;
        })}
      </Collapsible>
    </div>
  );
}
