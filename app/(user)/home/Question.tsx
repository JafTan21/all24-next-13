import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";
import Answer from "./Answer";

export default function Question({
  initialQuestion,
  game,
}: {
  initialQuestion: IQuestion;
  game: IGame;
}) {
  const [question, questionSet] = useState(initialQuestion);

  return (
    <Collapsible
      className="m-1 "
      trigger={
        <div
          className={`text-sm px-2 py-1 text-gray-800 bg-gray-200 border-b border-gray-300 flex justify-between`}
        >
          <b style={{ fontSize: 17 }}> {question.question}</b>
          <BsChevronDown />
        </div>
      }
    >
      <div className="px-1 flex flex-wrap">
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
