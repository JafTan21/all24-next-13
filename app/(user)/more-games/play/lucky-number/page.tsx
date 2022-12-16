"use client";

import {
  errorNotification,
  successNotification,
} from "../../../../../utils/helpers/NotificationHelper";
import { OptionGames } from "../../OptionGames";
import useCardFinder from "../../useCardFinder";

export default function OptionGame() {
  const { OptionGame } = useCardFinder({
    images: OptionGames.LuckyNumber.images,
    GameName: OptionGames.LuckyNumber.name,
    options: [{ name: "1" }, { name: "2" }, { name: "3" }],
    AutoSelectable: true,
    OnPlay: (res) => {
      let amount: number = res.data.winning_amount;
      if (amount == 0) {
        errorNotification("Game Lost");
      } else {
        successNotification(`You won: \$${amount}`);
      }
    },
  });

  return OptionGame;
}
