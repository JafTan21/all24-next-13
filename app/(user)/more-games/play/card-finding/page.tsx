"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.CardFinding.images,
    GameName: OptionGames.CardFinding.name,
    options: [{ name: "a_red" }, { name: "a_black" }],
  });

  return OptionGame;
}
