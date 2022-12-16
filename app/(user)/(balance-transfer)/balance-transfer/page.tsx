"use client";

import axios from "axios";
import React from "react";
import Input from "../../../../components/Html/Input";
import useUser from "../../../../hooks/api/useUser";
import BackBox from "../../../../components/Html/BackBox";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import Loading from "../../../../components/Html/Loading";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";

export default function BalanceTransfer() {
  const { user, isLoading } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      amount: undefined,
      to_username: "",
      password: "",
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/BalanceTransfer", state)
          .then((res) => {
            successNotification(res.data.message);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <UserPageWrapper>
      <BackBox
        title={`Balance Transfer To ${user?.is_super ? "User" : "Reseller"}`}
      >
        <form onSubmit={onSubmit}>
          <Input
            value={state.amount}
            name="amount"
            type="number"
            label="Amount"
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
          <Input
            value={state.password}
            name="password"
            label="Password"
            onChange={onChange}
            type="password"
            required={true}
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </BackBox>
    </UserPageWrapper>
  );
}
