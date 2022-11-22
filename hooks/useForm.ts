import React from "react";
import { useState } from "react";
import ErrorHandler from "../utils/helpers/ErrorHandler";

export default function useForm<T>({
  initialState,
  submit,
}: {
  initialState: T;
  submit: (state: T) => Promise<any>;
}) {
  const [state, stateSet] = useState<T>(initialState);
  const [isSubmitting, isSubmittingSet] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    stateSet((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type == "number" ? Number(e.target.value) : e.target.value,
      };
    });
  };

  const updateState = (params: Partial<T>) => {
    stateSet((prev) => {
      return {
        ...prev,
        ...params,
      };
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isSubmittingSet(true);

    submit(state)
      .then((response) => {
        // console.log(response);
      })
      .catch(ErrorHandler)
      .finally(() => isSubmittingSet(false));
  };

  return {
    state,
    onChange,
    updateState,
    isSubmitting,
    onSubmit,
  };
}
