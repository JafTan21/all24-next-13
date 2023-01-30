import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { AdminInput } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IRefresh } from "../../../../../libs/interfaces";
import { IGameType } from "../../../../../libs/Models/Game";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";

export const Add = ({ refresh }: IRefresh) => {
  const props = useModal({ title: "Add Game Type" });

  const { state, onChange, onSubmit, isSubmitting } = useForm<
    Partial<IGameType>
  >({
    initialState: {
      name: "",
      img: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/game-types", state)
          .then((res) => {
            adminSuccessNotification(res.data.message);
            refresh();
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  return (
    <>
      <button
        onClick={props.openModal}
        className="bg-green-500 text-white flex-center-center p-2 m-2 rounded shadow"
      >
        <BiPlus /> Add game type
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit}>
          <AdminInput
            value={state.name}
            name="name"
            label="Type Name"
            onChange={onChange}
            required={true}
            autoFocus={true}
          />
          <AdminInput
            value={state.img}
            name="img"
            label="Type Image Link"
            onChange={onChange}
            required={true}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Save" />
        </form>
      </Modal>
    </>
  );
};
