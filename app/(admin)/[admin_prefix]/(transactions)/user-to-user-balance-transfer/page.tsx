"use client";

import axios from "axios";
import React from "react";
import Input from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../hooks/useForm";
import { successNotification } from "../../../../../utils/helpers/NotificationHelper";

export default function UserToUserBalanceTransfer() {
  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      amount: undefined,
      from_username: "",
      to_username: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/balance-transfer-by-admin", state)
          .then((res) => {
            successNotification(res.data.message);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <AdminPageWrapper title="User To User Balance Transfer">
      <form onSubmit={onSubmit} className="bg-white m-2 p-3">
        <Input
          value={state.amount}
          name="amount"
          type="number"
          label="Amount"
          onChange={onChange}
          required={true}
        />
        <Input
          value={state.from_username}
          name="from_username"
          type="text"
          label="From Username"
          onChange={onChange}
          required={true}
        />
        <Input
          value={state.to_username}
          name="to_username"
          type="text"
          label="To Username"
          onChange={onChange}
          required={true}
        />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </AdminPageWrapper>
  );
}
