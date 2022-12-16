"use client";

import React from "react";
import Input from "../../../../components/Html/Input";
import useUser from "../../../../hooks/api/useUser";
import useResellers from "../../../../hooks/api/useResellers";
import BackBox from "../../../../components/Html/BackBox";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import Loading from "../../../../components/Html/Loading";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";
import axios from "axios";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";

export default function BalanceTransferToReseller() {
  const { user, isLoading } = useUser();
  const { reseller_usernames } = useResellers();

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
          .post("/user/UserToResellerBalanceTransfer", state)
          .then((res) => {
            successNotification(res.data.message);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  if (isLoading) return <Loading />;

  return (
    <UserPageWrapper>
      <BackBox title={`Balance Transfer To Reseller Only`}>
        <form onSubmit={onSubmit}>
          <Input
            value={state.amount}
            name="amount"
            type="number"
            label="Amount"
            onChange={onChange}
            required={true}
          />
          <div className="mb-6">
            <label className="inline-block mt-2 mr-4 font-bold text-gray-500">
              Select Reseller
            </label>
            <select
              name="to_username"
              onChange={onChange}
              value={state.to_username}
              className="block w-full p-2  bg-transparent border-b rounded appearance-none focus:outline-none"
            >
              <option value="">--- Select ---</option>
              {reseller_usernames?.map((reseller: string) => (
                <option value={reseller} key={reseller}>
                  {reseller}
                </option>
              ))}
            </select>
          </div>
          <Input
            value={state.to_username}
            name="to_username"
            type="text"
            label="Reseller Username"
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
