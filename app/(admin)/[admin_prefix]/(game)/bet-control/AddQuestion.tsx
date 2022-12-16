import axios from "axios";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useDefaultQUestions from "../../../../../hooks/api/admin/useDefaultQuestions";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IGame } from "../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../libs/Models/Question";

export default function AddQuestion({
  addQuestion,
  initialGame,
}: {
  initialGame: IGame;
  addQuestion: (q: IQuestion) => void;
}) {
  const props = useModal({ title: "Add Question" });
  const { state, onChange, onSubmit, isSubmitting } = useForm<
    Partial<IQuestion>
  >({
    initialState: {
      game_id: initialGame.id,
      question: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/question", state)
          .then((res) => {
            addQuestion(res.data.question);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  const { defaultQuestions } = useDefaultQUestions();

  return (
    <>
      <button onClick={props.openModal} className="admin-game-btn bg-blue-600">
        <span className="flex-center-center">
          <BiPlus /> Question
        </span>
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminSelect
            value={state.question}
            name="question"
            label="Select Question"
            onChange={onChange}
            enableDefault={true}
          >
            <>
              {defaultQuestions &&
                defaultQuestions
                  .filter((q) => q.game_name == initialGame.game_type.name)
                  .map((question) => {
                    return (
                      <option key={question.question} value={question.question}>
                        {question.question}
                      </option>
                    );
                  })}
            </>
          </AdminSelect>
          <AdminInput
            value={state.question}
            name="question"
            label="Question"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.ending_time}
            name="ending_time"
            type="datetime-local"
            label="Ending Time"
            onChange={onChange}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Save" />
        </form>
      </Modal>
    </>
  );
}
