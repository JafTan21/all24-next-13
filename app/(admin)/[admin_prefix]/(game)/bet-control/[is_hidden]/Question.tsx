import axios from "axios";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Collapsible from "../../../../../../components/Html/Collapsible";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../../components/Html/ToggleButton";
import StopPropagation from "../../../../../../components/Wrappers/StopPropagation";
import useForm, { verifyCSRF } from "../../../../../../hooks/useForm";
import { IGame } from "../../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../../libs/Models/Question";
import { Status } from "../../../../../../libs/Status";
import ErrorHandler from "../../../../../../utils/helpers/ErrorHandler";
import { useSocketUpdater } from "../../../../../../utils/helpers/SocketHelper";
import { useBetDetailsUpdater } from "../useBetDetailsUpdater";

import AddAnswer from "./AddAnswer";
import Answer from "./Answer";
import EditQuestion from "./EditQuestion";
import { NotSet, Separator, BoldOrNormalNumber } from "./Game";

const Key = (text: string) => {
  return <span className="text-gray-500">{text}</span>;
};

export default function Question({
  initialQuestion,
  initialGame,
}: {
  initialQuestion: IQuestion;
  initialGame: IGame;
}) {
  const [question, questionSet] = useState(initialQuestion);
  useSocketUpdater(
    question,
    [
      "id",
      "question",
      "can_bet",
      "starting_time",
      "ending_time",
      "show_to_users",
      "status",
    ],
    "update-question"
  );
  useBetDetailsUpdater<IQuestion>(
    `update-question-${question.id}-bet-details`,
    questionSet
  );

  const thClasses = "text-gray-600 font-normal px-2 border border-slate-200";

  const update = (newData: Partial<IQuestion>) => {
    verifyCSRF(() => {
      axios
        .put(`/admin/question/${question.id}`, { ...question, ...newData })
        .then((res) => {
          questionSet(res.data.question);
        })
        .catch(ErrorHandler);
    });
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
            <strong>{question.question}</strong>
            <Separator />
            {question.ending_time && (
              <>
                <span className="ml-1">
                  {Key("end: ")}
                  {question.ending_time || <NotSet />}
                </span>
              </>
            )}

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
                activeClass="bg-green-500 text-white"
                inactiveClass="bg-red-500 text-white"
                width={50}
                isActive={question.show_to_users}
                onClick={(e) =>
                  update({ show_to_users: !question.show_to_users })
                }
              />
              <ToggleButton
                on="Bet"
                off="No bet"
                activeClass="bg-green-500 text-white"
                inactiveClass="bg-red-500 text-white"
                width={60}
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
                inactiveClass="bg-red-500 text-white"
                isActive={!question.is_area_hidden}
                onClick={(e) =>
                  update({ is_area_hidden: !question.is_area_hidden })
                }
              />
            </StopPropagation>
            <span className="ml-1">
              ({Key("Bets: ")}
              <BoldOrNormalNumber num={question.bets_count || 0} after="," />
              <BoldOrNormalNumber num={question.bets_amount || 0} before=" " />
              $)
            </span>
            <span className="ml-1">
              ({Key("Multi: ")}
              <b className="text-red-500">{question.multibets_count || 0}</b>)
            </span>
            <span className="ml-1">
              ({Key("Limit: ")}
              <BoldOrNormalNumber num={question.total_limit || 0} />)
            </span>
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
                <th className={thClasses}>C-Rate</th>
                <th className={thClasses}>Bets</th>
                <th className={thClasses}>Multi</th>
                <th className={thClasses}>Possible Return</th>
                <th className={thClasses}>C-Out</th>
                <th className={thClasses}>Refund</th>
                <th className={`${thClasses}`} style={{ width: 200 }}>
                  Actions
                </th>
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
