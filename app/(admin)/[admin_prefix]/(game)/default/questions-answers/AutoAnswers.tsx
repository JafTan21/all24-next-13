import axios from "axios";
import { useState } from "react";
import { AdminInput } from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import useForm from "../../../../../../hooks/useForm";
import { IAutoAnswer } from "../../../../../../libs/Models/AutoQuestionAnswer";

interface Props {
  initialAnswers: IAutoAnswer[];
  auto_question_id: number | string;
  show: boolean;
}

export const AutoAnswers = ({
  initialAnswers,
  auto_question_id,
  show,
}: Props) => {
  const [answers, answersSet] = useState(initialAnswers);

  const { onSubmit, isSubmitting, state, onChange } = useForm({
    initialState: {
      answer: "",
      rate: undefined,
      auto_question_id,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/AutoAnswer", state)
          .then((res) => {
            answersSet(res.data);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <>
      <ol className="list-decimal">
        {answers &&
          answers.map((answer) => (
            <Maker
              row={answer}
              key={answer.id}
              show={show}
              answersSet={answersSet}
            />
          ))}
      </ol>

      {show && (
        <form onSubmit={onSubmit} className="flex">
          <AdminInput
            value={state.answer}
            name="answer"
            onChange={onChange}
            type="text"
            label="New Answer"
          />
          <AdminInput
            value={state.rate}
            name="rate"
            onChange={onChange}
            type="number"
            label="New Rate"
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      )}
    </>
  );
};

const Maker = ({
  row: answer,
  show,
  answersSet,
}: {
  row: IAutoAnswer;
  show: boolean;
  answersSet: (a: IAutoAnswer[]) => void;
}) => {
  const {
    submitWithoutForm: toogle,
    state,
    updateState,
  } = useForm({
    initialState: {
      is_active: answer.is_active,
    },
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/AutoAnswer/" + answer.id)
          .then((res) => {
            answersSet(res.data);
            resolve(res.data);
            updateState({ is_active: !state.is_active });
          })
          .catch(reject);
      });
    },
  });

  const { isSubmitting, submitWithoutForm } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("/admin/AutoAnswer/" + answer.id)
          .then((res) => {
            answersSet(res.data);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <li className="my-2">
      {answer.answer} ({answer.rate})
      <input checked={state.is_active} onChange={toogle} type="checkbox" />
      {show && (
        <SubmitButton
          isSubmitting={isSubmitting}
          onClick={submitWithoutForm}
          classNames="text-white rounded bg-red-500 p-2"
          text="delete"
        />
      )}
    </li>
  );
};
