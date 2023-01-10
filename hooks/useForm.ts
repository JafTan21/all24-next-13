import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ErrorHandler from "../utils/helpers/ErrorHandler";

export const verifyCSRF = (callback: () => void) => {
  axios
    .get("https://backend.gameingserver.xyz/public/sanctum/csrf-cookie")
    .then((response) => {
      try {
        callback();
      } catch (e) {
        console.error(e);
      }
    });
};

export default function useForm<T>({
  initialState,
  submit,

  resetOnResolve,
  submitAfter,
  shouldConfirmBeforeSubmitting,
}: {
  initialState: T;
  submit: (state: T) => Promise<any>;

  resetOnResolve?: boolean;
  submitAfter?: number;
  shouldConfirmBeforeSubmitting?: boolean;
}) {
  const [state, stateSet] = useState<T>(initialState);
  const [isSubmitting, isSubmittingSet] = useState(false);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    stateSet((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type == "number"
            ? Number(e.target.value) || undefined
            : e.target.value,
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
    submitWithoutForm();
  };

  const submitWithoutForm = () => {
    submitWithState({});
  };

  const update = (newState: Partial<T>) => {
    submitWithState(newState);
  };

  const submitWithState = (newState: Partial<T>) => {
    if (shouldConfirmBeforeSubmitting) {
      if (!window.confirm("Are you sure?")) {
        return;
      }
    }

    isSubmittingSet(true);

    setTimeout(() => {
      verifyCSRF(() => {
        submit({ ...state, ...newState })
          .then((response) => {
            if (resetOnResolve) {
              stateSet(initialState);
            }
          })
          .catch(ErrorHandler)
          .finally(() => isSubmittingSet(false));
      });
    }, submitAfter);
  };

  return {
    state,
    onChange,
    updateState,
    update,
    isSubmitting,
    onSubmit,
    submitWithoutForm,
    submitWithState,
  };
}
