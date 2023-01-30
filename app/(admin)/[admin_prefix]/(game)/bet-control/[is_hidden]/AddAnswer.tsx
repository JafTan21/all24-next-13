import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { AdminInput } from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import useForm from "../../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../../hooks/useModal";
import { IAnswer } from "../../../../../../libs/Models/Answer";
import { IQuestion } from "../../../../../../libs/Models/Question";

interface IAddAnswer extends Omit<Partial<IAnswer>, "rate"> {
  rate: number | string;
}

export default function AddAnswer({
  addAnswer,
  initialQuestion,
}: {
  initialQuestion: IQuestion;
  addAnswer: (q: IAnswer) => void;
}) {
  // const ref = useRef<HTMLInputElement>(null);

  const props = useModal({ title: "Add Answer" });
  const { state, onChange, onSubmit, isSubmitting } = useForm<IAddAnswer>({
    initialState: {
      question_id: initialQuestion.id,
      game_id: initialQuestion.game_id,
      answer: "",
      rate: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/answer", state)
          .then((res) => {
            addAnswer(res.data.answer);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

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
            autoFocus={true}
            // ref={ref} // todo
          />
          <AdminInput
            value={state.rate}
            type="number"
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
