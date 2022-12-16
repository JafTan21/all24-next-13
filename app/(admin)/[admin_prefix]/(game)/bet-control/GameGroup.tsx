import React from "react";
import Collapsible from "../../../../../components/Html/Collapsible";
import { IGame } from "../../../../../libs/Models/Game";
import Game from "./Game";

export default function GameGroup({
  initialGames,
  title,
  refresh,
}: {
  initialGames: IGame[];
  title: string;
  refresh: () => void;
}) {
  return (
    <div className="px-2 mt-2">
      <Collapsible time={100} text={title} className="border border-gray-100 ">
        {initialGames.map((game) => {
          return (
            <Game
              refresh={refresh}
              initialGame={game}
              key={`game-${game.id}`}
            />
          );
        })}
      </Collapsible>
    </div>
  );
}
