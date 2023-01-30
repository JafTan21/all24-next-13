import axios from "axios";
import { useEffect } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { AdminInput } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IRefresh } from "../../../../../libs/interfaces";
import { IGameType } from "../../../../../libs/Models/Game";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";

export const Edit = ({ refresh, type }: { type: IGameType } & IRefresh) => {
  const props = useModal({ title: "Edit Game Type" });

  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    Partial<IGameType>
  >({
    initialState: type,
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/game-types/" + type.id, state)
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
  useEffect(() => updateState(type), [type]);

  return (
    <>
      <button
        onClick={props.openModal}
        className="bg-green-500 text-white flex-center-center p-2 m-2 rounded shadow"
      >
        <BiEdit /> Edit
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
