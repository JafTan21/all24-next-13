import axios from "axios";
import {
  AdminInput,
  AdminSelect,
} from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import useGameTypes from "../../../../../../hooks/api/admin/useGameTypes";
import useForm from "../../../../../../hooks/useForm";
import { IRefresh } from "../../../../../../libs/interfaces";

export const Add = ({ refresh }: IRefresh) => {
  const { gameTypes } = useGameTypes();

  const { onSubmit, isSubmitting, state, onChange } = useForm({
    initialState: {
      game_name: "",
      question: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/DefaultQuestion", state)
          .then((res) => {
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <AdminSelect
        value={state.game_name}
        name="game_name"
        label="Game Name"
        onChange={onChange}
        required={true}
      >
        <>
          {gameTypes?.map((type) => {
            return (
              <option value={type.name} key={type.id}>
                {type.name}
              </option>
            );
          })}
        </>
      </AdminSelect>
      <AdminInput
        value={state.question}
        name="question"
        onChange={onChange}
        label="Question"
      />
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
};
