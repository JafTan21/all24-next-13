"use client";

import axios from "axios";
import React from "react";
import BackBox from "../../../components/Html/BackBox";
import Input from "../../../components/Html/Input";
import SubmitButton from "../../../components/Html/SubmitButton";
import ToastWrapper from "../../../components/Wrappers/ToastWrapper";
import useClub from "../../../hooks/api/useClub";
import useForm from "../../../hooks/useForm";
import { IClub } from "../../../libs/Models/Club";
import { successNotification } from "../../../utils/helpers/NotificationHelper";

export default function Profile() {
  const { club } = useClub();

  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      ...club,
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/club/update-profile", state)
          .then((res) => {
            successNotification(res.data.message);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <ToastWrapper>
      <p className="text-xl text-center mt-5">Club profile</p>
      <div className="flex flex-wrap justify-around p-2 w-min-screen">
        <div className="w-full mt-3 md:w-1/2 ">
          <div className="mx-1 bg-white shadow px-6 py-8 border border-gray-300 rounded md:m-2">
            <form className="mx-1  bg-white " onSubmit={onSubmit}>
              <Input
                label="Full Name"
                value={state.name}
                onChange={onChange}
                name="name"
                required={true}
                readonly={true}
              />
              <Input
                label="Email"
                value={state.owner_email}
                onChange={onChange}
                name="email"
                required={true}
                readonly={true}
              />
              <Input
                label="Old password"
                value={state.old_password}
                onChange={onChange}
                name="old_password"
                required={true}
              />
              <Input
                label="New password"
                value={state.new_password}
                onChange={onChange}
                name="new_password"
                required={true}
              />
              <Input
                label="Confirm password"
                value={state.confirm_password}
                onChange={onChange}
                name="confirm_password"
                required={true}
              />
              <SubmitButton isSubmitting={isSubmitting} text="Update" />
            </form>
          </div>
        </div>
      </div>
    </ToastWrapper>
  );
}
