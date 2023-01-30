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

interface IDepositRequest {
  amount: number | undefined;
  from: string;
  to: string;
  method: string;
  transaction_number: string;
}

export default function Deposit() {
  const { isLoading } = useUser();
  const { transactionMethods } = useTransactionMethods();

  const { state, onChange, updateState, onSubmit, isSubmitting } =
    useForm<IDepositRequest>({
      initialState: {
        amount: undefined,
        from: "",
        to: "",
        method: "",
        transaction_number: "",
      },
      resetOnResolve: true,
      submit: (state) => {
        return new Promise((resolve, reject) => {
          axios
            .post("/user/deposit", state)
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
      <BackBox title="Deposit">
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
            name="from"
            label="From"
            required={true}
            value={state.from}
            onChange={onChange}
          />

          <Input
            name="to"
            label="To"
            required={true}
            value={state.to}
            onChange={onChange}
            readonly={true}
          />
          <Input
            name="transaction_number"
            label="Transaction Number"
            required={true}
            value={state.transaction_number}
            onChange={onChange}
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
                        to: method.number,
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
