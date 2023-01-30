"use client";

import { useEffect } from "react";
import { IAnswer } from "../../../../../libs/Models/Answer";
import { IGame } from "../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../libs/Models/Question";
import { IBetUpdateData } from "../../../../IBetUpdateData";
import { useWebSocket } from "../../../../WebSocket";

type AnswerQuestionGame = IAnswer | IQuestion | IGame;

export function useBetDetailsUpdater<T>(
  key: string,
  setter: React.Dispatch<React.SetStateAction<T>>
) {
  const { socket } = useWebSocket();

  function check(x: any): x is AnswerQuestionGame {
    return true;
  }

  function hanlde__bet_details_update(data: IBetUpdateData) {
    setter((prev) => {
      if (!check(prev)) {
        return prev;
      }
      return {
        ...prev,

        bets_amount: Number(prev.bets_amount) + Number(data.bet_add_amount),
        bets_count: Number(prev.bets_count) + Number(data.bet_add_count),

        possible_return:
          Number(prev.possible_return) + Number(data.bet_add_possible_return),

        cashout_amount:
          Number(prev.cashout_amount) + Number(data.bet_add_cashout_amount),

        refund_amount:
          Number(prev.refund_amount) + Number(data.bet_add_refund_amount),

        multibets_count:
          Number(prev.multibets_count) + Number(data.multibet_add_count),
      };
    });
  }

  useEffect(() => {
    if (!socket) return;

    socket.on(key, hanlde__bet_details_update);

    return () => {
      socket.removeListener(key, hanlde__bet_details_update);
    };
  }, [socket]);
}
