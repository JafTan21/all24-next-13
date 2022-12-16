"use client";

import { OptionGames } from "../../OptionGames";
import useCardFinder from "../../useCardFinder";

export default function OptionGame() {
  const { OptionGame } = useCardFinder({
    images: OptionGames.CardFlip.images,
    GameName: OptionGames.CardFlip.name,
    options: [{ name: "a" }, { name: "q" }, { name: "8" }, { name: "10" }],
  });

  return OptionGame;
}
