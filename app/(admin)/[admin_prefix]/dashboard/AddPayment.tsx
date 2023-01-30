import axios from "axios";
import React from "react";
import { AdminInput } from "../../../../components/Html/Input";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import useSearch from "../../../../hooks/useSearch";
import { IRefresh } from "../../../../libs/interfaces";

export default function AddPayment({ refresh }: IRefresh) {
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm({
    initialState: { name: "", number: "", image: "" },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/TransactionMethod", state)
          .then((res) => {
            refresh();
            resolve(res.data);
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
    <form onSubmit={onSubmit} className="p-2 m-2 bg-white">
      <h2>Add New</h2>
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
              <label htmlFor={image.name + idx}>
                <img src={image.src} alt={image.name} style={{ height: 30 }} />
              </label>
              <input
                required
                type="radio"
                name="method"
                value={image.src}
                id={image.name + idx}
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
  );
}
