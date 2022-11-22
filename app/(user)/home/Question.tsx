import React from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";
import Answer from "./Answer";

export default function Question({
  question,
  game,
}: {
  question: IQuestion;
  game: IGame;
}) {
  return (
    <Collapsible
      className="m-1 "
      trigger={
        <div
          className={`text-sm px-2 py-1 text-gray-800 bg-gray-200 border-b border-gray-300 flex justify-between`}
        >
          <b style={{ fontSize: 17 }}> {question.question}</b>
          {/* {opened ? <BsChevronDown /> : <BsChevronUp />} */}
          <BsChevronDown />
        </div>
      }
    >
      <div className="px-1 flex flex-wrap">
        {Object.entries(question.answers).map(([id, answer], idx) => {
          return (
            <Answer
              answer={answer}
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
