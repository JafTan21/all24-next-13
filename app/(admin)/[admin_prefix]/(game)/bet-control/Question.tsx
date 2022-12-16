import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Collapsible from "../../../../../components/Html/Collapsible";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import Td from "../../../../../components/Html/Td";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import StopPropagation from "../../../../../components/Wrappers/StopPropagation";
import useForm from "../../../../../hooks/useForm";
import { IGame } from "../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../libs/Models/Question";
import { Status } from "../../../../../libs/Status";
import ErrorHandler from "../../../../../utils/helpers/ErrorHandler";
import AddAnswer from "./AddAnswer";
import Answer from "./Answer";
import EditQuestion from "./EditQuestion";
import { NotSet } from "./Game";

export default function Question({
  initialQuestion,
  initialGame,
}: {
  initialQuestion: IQuestion;
  initialGame: IGame;
}) {
  const [question, questionSet] = useState(initialQuestion);

  const thClasses = "text-gray-600 font-normal px-2 border border-slate-200";

  const update = (newData: Partial<IQuestion>) => {
    axios
      .put(`/admin/question/${question.id}`, { ...question, ...newData })
      .then((res) => {
        questionSet(res.data.question);
      })
      .catch(ErrorHandler);
  };

  if (question.status == Status.Closed) return null;

  return (
    <div
      className="my-[2px]"
      style={{
        background:
          question.can_bet && initialGame.can_bet ? "white" : "#decdc9",
      }}
    >
      <Collapsible
        isClosed={question.is_area_hidden}
        trigger={
          <div className="p-2 text-gray-800">
            <strong>{question.question}</strong>|
            <span className="ml-1">
              end: {question.ending_time || <NotSet />}
            </span>
            <StopPropagation className="inline text-white">
              <AddAnswer
                initialQuestion={question}
                addAnswer={(ans) => {
                  questionSet((prev) => ({
                    ...prev,
                    answers: {
                      ...prev.answers,
                      [ans.id]: ans,
                    },
                  }));
                }}
              />
              <EditQuestion
                initialQuestion={question}
                initialQuestionSet={questionSet}
              />
              <ToggleButton
                on="Show"
                off="Off"
                isActive={question.show_to_users}
                onClick={(e) =>
                  update({ show_to_users: !question.show_to_users })
                }
              />
              <ToggleButton
                on="Bet"
                off="No bet"
                isActive={question.can_bet}
                onClick={(e) => update({ can_bet: !question.can_bet })}
              />
              <button
                className="admin-game-btn bg-blue-600"
                onClick={(e) =>
                  window.confirm("Are you sure?") &&
                  update({ status: Status.Closed })
                }
              >
                <span className="flex-center-center">
                  <AiOutlineCloseCircle /> close
                </span>
              </button>
              <ToggleButton
                on="Are-Show"
                off="Area-Hide"
                isActive={!question.is_area_hidden}
                onClick={(e) =>
                  update({ is_area_hidden: !question.is_area_hidden })
                }
              />
            </StopPropagation>
            <span className="ml-1">
              (Bets: {question.bets_count}, {question.bets_amount} bdt)
            </span>
            <span className="ml-1">
              (Multibets: {question.multibets_count})
            </span>
            <span className="ml-1">(Limit: {question.total_limit})</span>
          </div>
        }
      >
        {/* answers */}
        <div className="w-full overflow-scroll text-center">
          <table>
            <thead>
              <tr>
                <th className={thClasses}>Answer</th>
                <th className={thClasses}>Rate</th>
                <th className={thClasses}>Cashout Rate</th>
                <th className={thClasses}>Bets</th>
                <th className={thClasses}>Multibets</th>
                <th className={thClasses}>Possible Return</th>
                <th className={thClasses}>Cashout</th>
                <th className={thClasses}>Refund</th>
                <th className={`${thClasses}`} style={{ width: 200 }}>
                  Actions
                </th>
                <th className={`${thClasses} w-[150px]`}>Results</th>
              </tr>
            </thead>
            <tbody>
              {question.answers &&
                Object.values(question.answers).map((answer, idx) => {
                  return (
                    <Answer
                      initialAnswer={answer}
                      questionSet={questionSet}
                      key={answer.id}
                    />
                  );
                })}
            </tbody>
            <tfoot>
              <RestartQuestion question={question} questionSet={questionSet} />
            </tfoot>
          </table>
        </div>
      </Collapsible>
    </div>
  );
}

const RestartQuestion = ({
  question,
  questionSet,
}: {
  question: IQuestion;
  questionSet: (q: IQuestion) => void;
}) => {
  const { onSubmit, isSubmitting } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/question/restart", {
            id: question.id,
          })
          .then((res) => {
            questionSet(res.data.question);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr>
      <td className="p-3">
        <form onSubmit={onSubmit}>
          <SubmitButton
            isSubmitting={isSubmitting}
            text="Restart"
            classNames="flex justify-center items-center w-full min-w-[80px] h-10 font-mt-6 bold transition duration-300 bg-red-600 rounded-3xl text-indigo-50 hover:bg-red-500"
          />
        </form>
      </td>
      <td colSpan={3}>Total bet: {question.bets_amount}</td>
    </tr>
  );
};
