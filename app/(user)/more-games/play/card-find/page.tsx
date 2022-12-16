"use client";

import { OptionGames } from "../../OptionGames";
import useCardFinder from "../../useCardFinder";

export default function OptionGame() {
  const { OptionGame } = useCardFinder({
    images: OptionGames.CardFind.images,
    GameName: OptionGames.CardFind.name,
    options: [{ name: "a" }, { name: "q" }, { name: "8" }, { name: "10" }],
    AutoSelectable: true,
  });

  return OptionGame;
}
