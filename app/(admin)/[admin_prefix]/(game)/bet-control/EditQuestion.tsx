import axios from "axios";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AdminInput } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IQuestion } from "../../../../../libs/Models/Question";
import FormatDate from "../../../../../utils/helpers/DateHelper";

export default function EditQuestion({
  initialQuestionSet,
  initialQuestion,
}: {
  initialQuestion: IQuestion;
  initialQuestionSet: (g: IQuestion) => void;
}) {
  const props = useModal({ title: "Edit Question" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    Partial<IQuestion>
  >({
    initialState: initialQuestion,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put(`/admin/question/${state.id}`, state)
          .then((res) => {
            initialQuestionSet(res.data.question);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  useEffect(() => {
    updateState(initialQuestion);
  }, [initialQuestion]);

  return (
    <>
      <button onClick={props.openModal} className="admin-game-btn bg-blue-600">
        <span className="flex-center-center">
          <BiEdit /> Edit
        </span>
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.question}
            name="question"
            label="Question"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={FormatDate(state.ending_time)}
            name="ending_time"
            type="datetime-local"
            label="Ending Time"
            onChange={onChange}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
}
