"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

export default function OptionGame() {
  const { OptionGame } = useOptoinGame({
    GameName: OptionGames.LuckySpin.name,
    images: OptionGames.LuckySpin.images,
    options: [
      { name: "mobile" },
      { name: "h phone" },
      { name: "bag" },
      { name: "watch" },
      { name: "charger" },
      { name: "mobile 2" },
    ],
    isSpinner: true,
    text_required: true,
  });

  return OptionGame;
}
