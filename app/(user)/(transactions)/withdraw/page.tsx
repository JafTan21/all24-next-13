"use client";
import axios from "axios";
import React from "react";
import Input from "../../../../components/Html/Input";
import useUser from "../../../../hooks/api/useUser";
import BackBox from "../../../../components/Html/BackBox";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import Loading from "../../../../components/Html/Loading";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";
import useTransactionMethods from "../../../../hooks/api/useTransactionMethods";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

interface IWithdrawRequest {
  amount: number | undefined;
  to: string;
  method: string;
  password: string;
}

export default function Deposit() {
  const { isLoading } = useUser();
  const { transactionMethods } = useTransactionMethods();

  const { state, onChange, updateState, onSubmit, isSubmitting } =
    useForm<IWithdrawRequest>({
      initialState: {
        amount: undefined,
        to: "",
        method: "",
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
    });

  if (isLoading) return <Loading />;

  return (
    <UserPageWrapper>
      <BackBox title="Withdraw">
        <form onSubmit={onSubmit}>
          <Input
            name="amount"
            label="Amount"
            type="number"
            required={true}
            value={state.amount}
            onChange={onChange}
          />

          <Input
            name="to"
            label="To"
            required={true}
            value={state.to}
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

          <span className="text-sm text-gray-900">Select account type</span>
          <div className="flex items-center justify-center mt-2 space-x-1">
            {transactionMethods?.map((method: any, idx: any) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center"
                >
                  <label htmlFor={method.name + idx}>
                    <img
                      src={method.image}
                      alt={method.name}
                      style={{ height: 60 }}
                    />
                  </label>
                  <input
                    required
                    type="radio"
                    name="method"
                    id={method.name + idx}
                    onChange={(e) => {
                      updateState({
                        method: method.name,
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </BackBox>
    </UserPageWrapper>
  );
}
