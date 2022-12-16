"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.KingQueen.images,
    GameName: OptionGames.KingQueen.name,
    options: [
      { name: "king", background: "bg-transparent" },
      { name: "queen", background: "bg-transparent" },
    ],
  });

  return OptionGame;
}
