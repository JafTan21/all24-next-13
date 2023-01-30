"use client";

import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import useUser from "../../../hooks/api/useUser";
import { IAnswer } from "../../../libs/Models/Answer";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";
import { Status } from "../../../libs/Status";
import ErrorHandler from "../../../utils/helpers/ErrorHandler";
import { errorNotification } from "../../../utils/helpers/NotificationHelper";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";
import BetModal from "./BetModal";
import { MultibetContext } from "./Multibet";

export default function Answer({
  initialAnswer,
  question,
  game,
  idx,
}: {
  idx: number;
  initialAnswer: IAnswer;
  game: IGame;
  question: IQuestion;
}) {
  const [answer, answerSet] = useState(initialAnswer);
  useSocketReciever(`update-answer-${initialAnswer.id}`, (data) => {
    answerSet((prev) => ({ ...prev, ...data }));
  });

  const [show, showSet] = useState(false);
  const { user, isLoading } = useUser();

  const { betsForMultibet, betsForMultibetSet } = useContext(MultibetContext);
  const [loading, loadingSet] = useState(false);

  const SelectForMultibet = () => {
    loadingSet(true);
    axios
      .post("/user/check-answer-id-for-multi", {
        prevIds: betsForMultibet.map((bet) => bet.answer.id),
        newId: answer.id,
      })
      .then((res) => {
        betsForMultibetSet([
          ...betsForMultibet,
          {
            game,
            question,
            answer,
          },
        ]);
      })
      .catch(ErrorHandler)
      .finally(() => loadingSet(false));
  };

  const handleClick = () => {
    if (isLoading) return;

    if (!user) {
      errorNotification("Please login before playing");
      return;
    }

    if (!answer.can_bet || !game.can_bet || !question.can_bet) {
      errorNotification("Paused");
      return;
    }

    if (betsForMultibet.length > 0) {
      SelectForMultibet();
    } else {
      showSet(true);
    }
  };

  //
  const [bettable, bettableSet] = useState(() => {
    return game?.can_bet && question?.can_bet;
  });
  const [lastRate, lastRateSet] = useState(() => answer.rate);
  const [rateBg, rateBgSet] = useState(() => {
    return bettable ? "rate-bg text-white" : "bg-red-400 text-gray-700";
  });

  useEffect(() => {
    bettableSet((prev) => {
      return game?.can_bet && question?.can_bet;
    });
  }, [game, question]);

  useEffect(() => {
    let color = "rate-bg text-white";

    if (answer.rate > lastRate) color = "rate-increased-bg text-gray-800";
    if (answer.rate < lastRate) color = "bg-red-300 text-gray-700";

    if (!bettable) color = "bg-red-400 text-gray-700";

    rateBgSet(color);
    setTimeout(() => {
      rateBgSet(() => {
        return bettable ? "rate-bg text-white" : "bg-red-400 text-gray-700";
      });
    }, 1500);
    lastRateSet(answer.rate);
  }, [answer, bettable]);

  if (
    !answer.show_to_users ||
    answer.status == Status.Closed ||
    (answer.ending_time && moment(answer.ending_time).isBefore())
  ) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`px-1.5 w-1/2 bg-white border overflow-hidden flex justify-between items-center text-left text-lg text-gray-700`}
        style={{
          borderBottom: ".1px solid #c4c4c4",
          borderTop: 0,
          borderRight: idx % 2 == 0 ? ".1px solid #c4c4c4" : 0,
          borderLeft: 0,
        }}
      >
        {loading && (
          <>
            <Rings
              height={40}
              width={40}
              color={"black"}
              ariaLabel="loading-indicator"
            />
            <span className="text-gray-500">checking..</span>
          </>
        )}

        {!loading && (
          <>
            <div
              style={{
                whiteSpace: "nowrap",
                marginRight: "4px",
                overflow: "scroll",
              }}
              className="flex items-center"
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {answer.answer}
              </span>
            </div>

            {bettable ? (
              <span
                className={`px-4 my-1 rounded ${rateBg}`}
                style={{
                  fontSize: 14,
                  width: 60,
                  textAlign: "center",
                }}
              >
                {Number(answer.rate).toFixed(2)}
              </span>
            ) : (
              <span className={`px-1 py-1 my-1 `}>
                <Image
                  height={20}
                  width={20}
                  src="/assets/icons/lock.png"
                  alt=""
                />
              </span>
            )}
          </>
        )}
      </button>

      <BetModal
        answer={answer}
        game={game}
        question={question}
        show={show}
        showSet={showSet}
      />
    </>
  );
}
