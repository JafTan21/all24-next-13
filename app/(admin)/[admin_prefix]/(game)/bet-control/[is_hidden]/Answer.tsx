import axios from "axios";
import Link from "next/link";
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AdminInput } from "../../../../../../components/Html/Input";
import Loading from "../../../../../../components/Html/Loading";
import StatusText from "../../../../../../components/Html/StatusText";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import Table from "../../../../../../components/Html/Table";
import ToggleButton from "../../../../../../components/Html/ToggleButton";
import StopPropagation from "../../../../../../components/Wrappers/StopPropagation";
import useForm from "../../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../../hooks/useModal";
import { IAnswer } from "../../../../../../libs/Models/Answer";
import { IGame } from "../../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../../libs/Models/Question";
import { Status } from "../../../../../../libs/Status";
import {
  CheckObjectReadyForSocketUpdate,
  useSocketUpdater,
} from "../../../../../../utils/helpers/SocketHelper";
import { IBetUpdateData } from "../../../../../IBetUpdateData";
import { useWebSocket } from "../../../../../WebSocket";
import {
  MultibetRowMaker,
  MultibetTableHeader,
} from "../../history/multibet/MultibetComponents";
import { useBetDetailsUpdater } from "../useBetDetailsUpdater";
import useMultibetData from "./multibet-data-api";
import useCashoutSetting from "./useCashoutSetting";

const AnswerContext = createContext<{
  answer: IAnswer;
  answerSet: Dispatch<React.SetStateAction<IAnswer>>;

  questionSet: (q: IQuestion) => void;
}>({
  answer: {
    id: 0,
    question_id: 0,
    game_id: 0,

    answer: "",
    rate: 0,
    max_bet: 0,
    min_bet: 0,
    starting_time: "",
    ending_time: "",

    result_by_email: "",
    added_by_email: "",

    show_to_users: true,
    can_bet: true,
    status: 0,

    cashout_rate: 0,
    is_cashout_on: true,

    total_limit: 0,
  },
  answerSet: (a) => {},
  questionSet: (q) => {},
});

export default function Answer({
  initialAnswer,
  questionSet,
}: {
  initialAnswer: IAnswer;
  questionSet: (q: IQuestion) => void;
}) {
  const [answer, answerSet] = useState(initialAnswer);
  useEffect(() => answerSet(initialAnswer), [initialAnswer]);

  useSocketUpdater(
    answer,
    [
      "id",
      "answer",
      "rate",
      "cashout_rate",
      "is_cashout_on",
      "can_bet",
      "starting_time",
      "ending_time",
      "show_to_users",
      "status",
    ],
    "update-answer"
  );
  useBetDetailsUpdater<IAnswer>(
    `update-answer-${answer.id}-bet-details`,
    answerSet
  );

  const { cashout_setting } = useCashoutSetting();

  const thClasses = "border border-slate-200 px-1";

  const get_bg = () => {
    if (answer.status == Status.Win) return "#9add9a";
    if (answer.status == Status.Lose) return "#e19c8f";
    if (answer.status == Status.Refund) return "#fbafff";

    return "white";
  };

  if (answer.status == Status.Closed) return null;

  return (
    <AnswerContext.Provider value={{ answer, answerSet, questionSet }}>
      <tr
        style={{
          background: get_bg(),
        }}
      >
        <td className={thClasses}>{answer.answer} </td>
        <td className={thClasses}>
          <RateModal key={answer.id} />
        </td>
        <td className={thClasses}>
          {cashout_setting?.feature_on && answer.is_cashout_on && (
            <CashoutRateModal />
          )}
        </td>
        <td className={thClasses}>
          <Link
            href={"bets?pending=false&answer_id=" + answer.id}
            target={`_bets_of_${answer.id}`}
          >
            <button className="text-blue-500">
              <span className="bg-blue-500 text-white rounded p-1">
                {answer.bets_count}
              </span>
              <br />
              {answer.bets_amount}
            </button>
          </Link>
        </td>
        <td className={thClasses}>
          <MultibetsModal />
        </td>
        <td className={thClasses}>{answer.possible_return}</td>
        <td className={thClasses}>{answer.cashout_amount}</td>
        <td className={thClasses}>{answer.refund_amount}</td>
        <td className={thClasses}>
          <div className="flex-center-center">
            {answer.status == Status.Live ? (
              <ResultButtons />
            ) : (
              <StatusText status={answer.status} />
            )}
            <ActionButtons />
          </div>
        </td>
      </tr>
    </AnswerContext.Provider>
  );
}

const RateModal = () => {
  const { answer, answerSet } = useContext(AnswerContext);
  const {
    state,
    onSubmit,
    onChange,
    isSubmitting,
    updateState,
    submitWithoutForm,
  } = useForm({
    initialState: answer,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/answer/" + answer.id, state)
          .then((res) => {
            answerSet(res.data.answer);
            resolve(state);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });
  const onClose = () => {
    if (answer.rate != state.rate) {
      submitWithoutForm();
    }
  };
  const props = useModal({ title: "Edit Rate", onClose });

  useEffect(() => updateState(answer), [answer]);

  return (
    <>
      <button
        onClick={props.openModal}
        className="w-full bg-blue-600 text-white px-3 py-2 rounded"
      >
        {answer.rate}
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.rate}
            name="rate"
            label="Rate"
            type="number"
            onChange={onChange}
            required={true}
            autoFocus={true}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
};

const CashoutRateModal = () => {
  const { answer, answerSet } = useContext(AnswerContext);

  const {
    state,
    onSubmit,
    onChange,
    isSubmitting,
    updateState,
    submitWithoutForm,
  } = useForm({
    initialState: answer,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/answer/" + answer.id, state)
          .then((res) => {
            answerSet(res.data.answer);
            resolve(state);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  const onClose = () => {
    if (answer.cashout_rate != state.cashout_rate) {
      submitWithoutForm();
    }
  };
  const props = useModal({ title: "Edit Cashout Rate", onClose });

  useEffect(() => updateState(answer), [answer]);

  return (
    <>
      <button
        onClick={props.openModal}
        className=" w-full h-full bg-blue-600 text-white px-3 py-2 rounded"
      >
        {answer.cashout_rate}
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.cashout_rate}
            name="cashout_rate"
            label="Cashout Rate"
            onChange={onChange}
            required={true}
            autoFocus={true}
            type="number"
          />
          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
};

const ActionButtons = () => {
  const { answer, answerSet } = useContext(AnswerContext);
  const { cashout_setting } = useCashoutSetting();

  const [show, showSet] = useState(false);

  const { update, state, updateState } = useForm({
    initialState: answer,
    submit: (state) => {
      showSet(false);
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/answer/" + answer.id, state)
          .then((res) => {
            answerSet(res.data.answer);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });
  useEffect(() => updateState(answer), [answer]);

  return (
    <>
      {show && (
        <div
          className="w-screen h-screen fixed top-0 left-0"
          onClick={() => showSet(false)}
        ></div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={(e) => showSet((show) => !show)}
          className="bg-green-800 cursor-pointer text-white p-2 rounded ml-1"
        >
          Actions
        </button>
        {show && (
          <StopPropagation>
            <div
              className="bg-gray-200 p-3 absolute shadow-lg"
              style={{ zIndex: 20, left: "-200%", top: "-100%" }}
            >
              <div className="flex-center-center mb-2">
                <ToggleButton
                  on="Show"
                  off="Hide"
                  width={60}
                  height={30}
                  isActive={state.show_to_users}
                  onClick={(e) =>
                    update({ show_to_users: !state.show_to_users })
                  }
                />
                <ToggleButton
                  on="Bet"
                  off="No bet"
                  width={60}
                  height={30}
                  isActive={state.can_bet}
                  onClick={(e) => update({ can_bet: !state.can_bet })}
                />
              </div>
              <div className="flex-center-center">
                <button
                  className="admin-game-btn bg-red-600 text-white h-[30px]"
                  onClick={(e) =>
                    window.confirm("Are you sure?") &&
                    update({ status: Status.Closed })
                  }
                >
                  <span className="flex-center-center">
                    <AiOutlineCloseCircle /> close
                  </span>
                </button>

                <EditAnswer />
              </div>
              {cashout_setting?.feature_on && (
                <div className="flex-center-center">
                  <ToggleButton
                    on="c-on"
                    off="c-off"
                    width={60}
                    height={30}
                    isActive={state.is_cashout_on}
                    onClick={(e) =>
                      update({ is_cashout_on: !state.is_cashout_on })
                    }
                  />
                </div>
              )}
            </div>
          </StopPropagation>
        )}
      </div>
    </>
  );
};

const ResultButtons = () => {
  const { answer, questionSet, answerSet } = useContext(AnswerContext);

  const { update } = useForm({
    initialState: {
      status: Status.Win,
    },
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/answer/result/" + answer.id, {
            status: state.status,
          })
          .then((res) => {
            questionSet(res.data.question);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  const { submitWithoutForm: refund } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/multibets/refund", {
            answer_id: answer.id,
          })
          .then((res) => {
            answerSet(res.data.answer);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });
  const [show, showSet] = useState(false);

  return (
    <>
      {show && (
        <div
          className="w-screen h-screen fixed top-0 left-0"
          onClick={() => showSet(false)}
        ></div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={(e) => showSet((show) => !show)}
          className="bg-green-800 cursor-pointer text-white p-2 rounded"
        >
          Result
        </button>
        {show && (
          <StopPropagation>
            <div
              className="bg-gray-200 absolute shadow-lg"
              style={{ zIndex: 20, right: "100%", top: "-50%" }}
            >
              <div className="flex">
                <button
                  type="button"
                  className="inline-block px-5 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800 transition duration-150 ease-in-out"
                  onClick={(e) => {
                    update({ status: Status.Win });
                  }}
                >
                  Win
                </button>
                <button
                  type="button"
                  className="inline-block px-5 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-red-800 transition duration-150 ease-in-out"
                  onClick={(e) => {
                    update({ status: Status.Lose });
                  }}
                >
                  Lose
                </button>
              </div>
              <button
                type="button"
                className="inline-block mt-1 w-full px-3 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                onClick={refund}
              >
                Refund
              </button>
            </div>
          </StopPropagation>
        )}
      </div>
    </>
  );
};

const EditAnswer = () => {
  const { answer, answerSet } = useContext(AnswerContext);

  const props = useModal({ title: "Edit Answer" });
  const { state, onSubmit, onChange, isSubmitting, updateState } = useForm({
    initialState: answer,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/answer/" + answer.id, state)
          .then((res) => {
            answerSet(res.data.answer);
            resolve(state);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  useEffect(() => updateState(answer), [answer]);

  return (
    <>
      <button
        onClick={props.openModal}
        className="admin-game-btn bg-blue-600 text-white h-[30px]"
      >
        <span className="flex-center-center">
          <BiEdit /> Edit
        </span>
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.answer}
            name="answer"
            label="Answer"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.rate}
            name="rate"
            label="Rate"
            onChange={onChange}
            required={true}
            autoFocus={true}
          />
          <AdminInput
            value={state.total_limit}
            name="total_limit"
            label="Bet Limit"
            onChange={onChange}
            required={true}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
};

const MultibetsModal = () => {
  const { answer } = useContext(AnswerContext);
  const props = useModal({ title: "Multibets" });
  const { multibets, isLoading } = useMultibetData(answer.id, props.isOpened);

  return (
    <>
      <button
        onClick={props.openModal}
        className="bg-blue-500 text-white rounded p-1"
      >
        {answer.multibets_count}
      </button>

      <Modal {...props} bodyClassName="pt-2 pb-4">
        {isLoading && (
          <div className="flex-center-centerx">
            <Loading minimal={true} />
          </div>
        )}

        <Table header={<MultibetTableHeader />}>
          {multibets &&
            multibets.map((row) => <MultibetRowMaker row={row} key={row.id} />)}
        </Table>
      </Modal>
    </>
  );
};
