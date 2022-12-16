"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.DiceRolling.images,
    GameName: OptionGames.DiceRolling.name,
    options: [
      { name: "one", background: "bg-transparent" },
      { name: "two", background: "bg-transparent" },
      { name: "three", background: "bg-transparent" },
      { name: "four", background: "bg-transparent" },
      { name: "five", background: "bg-transparent" },
      { name: "six", background: "bg-transparent" },
    ],
  });

  return OptionGame;
}
