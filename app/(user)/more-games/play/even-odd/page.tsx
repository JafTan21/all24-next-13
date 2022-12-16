"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    GameName: OptionGames.EvenOdd.name,
    images: OptionGames.EvenOdd.images,
    options: [{ name: "even" }, { name: "odd" }],
  });

  return OptionGame;
}
