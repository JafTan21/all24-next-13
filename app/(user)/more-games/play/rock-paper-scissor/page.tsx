"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

const PoolNumber = () => {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.RockPaperScissor.images,
    GameName: OptionGames.RockPaperScissor.name,
    options: [{ name: "rock" }, { name: "paper" }, { name: "scissor" }],
  });

  return OptionGame;
};

export default PoolNumber;
