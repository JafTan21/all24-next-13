"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

const NumberSpin = () => {
  const { OptionGame } = useOptoinGame({
    GameName: OptionGames.NumberSpin.name,
    images: OptionGames.NumberSpin.images,
    options: [
      { name: "10" },
      { name: "20" },
      { name: "30" },

      { name: "40" },
      { name: "50" },
      { name: "60" },

      { name: "70" },
      { name: "80" },
      { name: "90" },

      { name: "100" },
    ],
    isSpinner: true,
    text_required: true,
  });

  return OptionGame;
};

export default NumberSpin;
