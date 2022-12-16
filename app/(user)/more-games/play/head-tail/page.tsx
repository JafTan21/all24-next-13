"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.HeadTail.images,
    GameName: OptionGames.HeadTail.name,
    options: [
      { name: "head", background: "bg-transparent" },
      { name: "tail", background: "bg-transparent" },
    ],
  });

  return OptionGame;
}
