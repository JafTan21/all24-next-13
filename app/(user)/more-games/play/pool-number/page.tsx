"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

const PoolNumber = () => {
  const { OptionGame } = useOptoinGame({
    GameName: OptionGames.PoolNumber.name,
    images: OptionGames.PoolNumber.images,
    options: [
      { name: "one" },
      { name: "two" },
      { name: "three" },
      { name: "four" },
      { name: "five" },
      { name: "six" },
      { name: "seven" },
      { name: "eight" },
    ],
  });

  return OptionGame;
};

export default PoolNumber;
