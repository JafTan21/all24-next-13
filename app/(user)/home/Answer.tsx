import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import useUser from "../../../hooks/api/useUser";
import { IAnswer } from "../../../libs/Models/Answer";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";
import { errorNotification } from "../../../utils/helpers/NotificationHelper";
import BetModal from "./BetModal";
import Question from "./Question";

export default function Answer({
  answer,
  question,
  game,
  idx,
}: {
  answer: IAnswer;
  idx: number;
  game: IGame;
  question: IQuestion;
}) {
  const [show, showSet] = useState(false);
  const { user, isLoading } = useUser();

  const handleClick = () => {
    if (isLoading) return;

    if (!user) {
      errorNotification("Please login before playing");
      return;
    }

    showSet(true);
  };

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
        <div
          style={{
            whiteSpace: "nowrap",
            marginRight: "4px",
          }}
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

        <span
          className={`px-4 my-1 rounded text-white rate-bg`}
          style={{
            fontSize: 14,
            width: 60,
            textAlign: "center",
          }}
        >
          {Number(answer.rate).toFixed(2)}
        </span>
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
