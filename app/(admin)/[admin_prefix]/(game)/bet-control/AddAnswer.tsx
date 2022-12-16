import axios from "axios";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { AdminInput } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IAnswer } from "../../../../../libs/Models/Answer";
import { IQuestion } from "../../../../../libs/Models/Question";

export default function AddAnswer({
  addAnswer,
  initialQuestion,
}: {
  initialQuestion: IQuestion;
  addAnswer: (q: IAnswer) => void;
}) {
  const props = useModal({ title: "Add Answer" });
  const { state, onChange, onSubmit, isSubmitting } = useForm<Partial<IAnswer>>(
    {
      initialState: {
        question_id: initialQuestion.id,
        game_id: initialQuestion.game_id,
        answer: "",
        rate: undefined,
      },
      resetOnResolve: true,
      submit: (state) => {
        return new Promise((resolve, reject) => {
          axios
            .post("/admin/answer", state)
            .then((res) => {
              addAnswer(res.data.answer);
              resolve(res.data);
              props.closeModal();
            })
            .catch(reject);
        });
      },
    }
  );

  return (
    <>
      <button onClick={props.openModal} className="admin-game-btn bg-blue-600">
        <span className="flex-center-center">
          <BiPlus /> Answer
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
          />
          <SubmitButton isSubmitting={isSubmitting} text="Save" />
        </form>
      </Modal>
    </>
  );
}
