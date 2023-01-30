import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AdminInput } from "../../../../components/Html/Input";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import useModal, { Modal } from "../../../../hooks/useModal";
import useSearch from "../../../../hooks/useSearch";
import { IRefresh } from "../../../../libs/interfaces";
import { IPaymentMethod } from "../../../../libs/Models/PaymentMethod";

export default function EditPayment({
  method,
  refresh,
}: { method: Partial<IPaymentMethod> } & IRefresh) {
  const props = useModal({ title: "Edit Payment" });

  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm({
    initialState: method,
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/TransactionMethod/" + method.id, state)
          .then((res) => {
            refresh();
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

  const { data: images } = useSearch<
    {
      id: number;
      name: string;
      src: string;
    }[]
  >({
    url: "/admin/get-images",
    noPagination: true,
    params: {
      images_of: "TransactionImages",
    },
  });

  return (
    <>
      <button
        onClick={props.openModal}
        className="bg-blue-500 text-white flex-center-center p-2 rounded shadow"
      >
        <BiEdit />
      </button>
      <Modal {...props}>
        <form onSubmit={onSubmit} className="p-2 m-2 bg-white">
          <div className="flex justify-center">
            <AdminInput
              name="name"
              value={state.name}
              onChange={onChange}
              label="name"
            />
            <AdminInput
              name="number"
              value={state.number}
              onChange={onChange}
              type="text"
              label="number"
            />
          </div>
          <div className="flex">
            {images?.map((image, idx: number) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center"
                >
                  <label htmlFor={"edit-" + image.name + idx}>
                    <img
                      src={image.src}
                      alt={image.name}
                      style={{ height: 30 }}
                    />
                  </label>
                  <input
                    required
                    type="radio"
                    checked={image.src == state.image}
                    name="method"
                    value={image.src}
                    id={"edit-" + image.name + idx}
                    onChange={(e) => {
                      updateState({
                        image: e.target.value,
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Modal>
    </>
  );
}
