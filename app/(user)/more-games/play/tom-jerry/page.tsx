"use client";

import { OptionGames } from "../../OptionGames";
import useOptoinGame from "../../useOptionGame";

const TomJerry = () => {
  const { OptionGame } = useOptoinGame({
    images: OptionGames.TomJerry.images,
    GameName: OptionGames.TomJerry.name,
    options: [{ name: "tom" }, { name: "jerry" }],
  });

  return OptionGame;
};

export default TomJerry;
