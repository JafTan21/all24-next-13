"use client";
import axios from "axios";
import React from "react";
import Input from "../../../components/Html/Input";
import useUser from "../../../hooks/api/useUser";
import SubmitButton from "../../../components/Html/SubmitButton";
import useForm from "../../../hooks/useForm";
import Loading from "../../../components/Html/Loading";
import { successNotification } from "../../../utils/helpers/NotificationHelper";
import useTransactionMethods from "../../../hooks/api/useTransactionMethods";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";

interface IWithdrawRequest {
  amount: number | undefined;
  super_id_username: string;
  password: string;
}

export default function Withdraw() {
  const { isLoading } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm<IWithdrawRequest>(
    {
      initialState: {
        amount: undefined,
        super_id_username: "",
        password: "",
      },
      resetOnResolve: true,
      submit: (state) => {
        return new Promise((resolve, reject) => {
          axios
            .post("/user/withdraw", state)
            .then((res) => {
              resolve(res.data);
              successNotification(res.data.message);
            })
            .catch(reject);
        });
      },
    }
  );

  if (isLoading) return <Loading />;

  return (
    <ClubPageWrapper>
      <div className="mx-2 box-border ">
        <div className="mt-5 overflow-hidden bg-white mx-auto  border  rounded shadow-xl w-screen-full max-w-md">
          <p className="text-xl py-2 text-center text-white bg-orange-600">
            Withdraw
          </p>
          <form onSubmit={onSubmit} className="p-3">
            <Input
              name="amount"
              label="Amount"
              type="number"
              required={true}
              value={state.amount}
              onChange={onChange}
            />
            <Input
              name="super_id_username"
              label="Super ID username"
              type="text"
              required={true}
              value={state.super_id_username}
              onChange={onChange}
            />

            <Input
              name="password"
              label="Password"
              required={true}
              value={state.password}
              onChange={onChange}
              type="password"
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </ClubPageWrapper>
  );
}
