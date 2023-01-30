"use client";

import moment from "moment";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";
import { Status } from "../../../libs/Status";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";
import Answer from "./Answer";

export default function Question({
  initialQuestion,
  game,
  is_single_game,
}: {
  initialQuestion: IQuestion;
  game: IGame;
  is_single_game: boolean | undefined;
}) {
  const [question, questionSet] = useState(initialQuestion);
  useSocketReciever(`update-question-${question.id}`, (data) => {
    questionSet((prev) => ({ ...prev, ...data }));
  });

  if (
    !question.show_to_users ||
    question.status == Status.Closed ||
    (question.ending_time && moment(question.ending_time).isBefore())
  ) {
    return null;
  }

  return (
    <Collapsible
      className="m-1 "
      isClosed={!is_single_game && game.status == Status.Upcoming}
      trigger={
        <div
          className={`text-sm px-2 py-1 text-gray-800 bg-gray-200 border-b border-gray-300 flex justify-between`}
        >
          <b style={{ fontSize: 16 }}> {question.question}</b>
          <BsChevronDown />
        </div>
      }
    >
      <div className="flex flex-wrap bg-white">
        {question.answers &&
          Object.entries(question.answers).map(([id, answer], idx) => {
            return (
              <Answer
                initialAnswer={answer}
                game={game}
                question={question}
                key={`answer-${id}`}
                idx={idx}
              />
            );
          })}
      </div>
    </Collapsible>
  );
}
