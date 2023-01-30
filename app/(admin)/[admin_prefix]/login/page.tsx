"use client";

import axios from "axios";
import React from "react";
import { mutate } from "swr";
import { AdminConfig } from "../../../../app.config";
import Input from "../../../../components/Html/Input";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import Loading from "../../../../components/Html/Loading";
import { redirect, useRouter } from "next/navigation";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import { setCookie } from "cookies-next";
import moment from "moment";
import {
  adminSuccessNotification,
  successNotification,
} from "../../../../utils/helpers/NotificationHelper";
import useAdmin from "../../../../hooks/api/admin/useAdmin";
import { getPrefix } from "../../../../utils/admin/adminHelpers";
import OtpVerificationWrapper from "../../../../components/Wrappers/OtpVerificationWrapper";
import { IOtp } from "../../../../libs/Models/OTP";

interface ILogin {
  email: string;
  password: string;
  admin_prefix: string | undefined;
}

export default function Login() {
  const { admin, isLoading } = useAdmin();
  const router = useRouter();
  const admin_prefix = getPrefix();

  const {
    state,
    onChange,
    onSubmit,
    isSubmitting,
    updateState,
    submitWithState,
  } = useForm<ILogin & IOtp>({
    initialState: {
      email: "",
      password: "",
      admin_prefix,
      otp: "",
      // if already verified, step=2
      step: 1,
      form_step: 1,
      end: undefined,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/login", state)
          .then((res) => {
            if (res.data.admin_token) {
              setCookie(AdminConfig.admin_token, res.data.admin_token, {
                expires: moment().add(60, "days").toDate(),
              });
              mutate("/admin/get-admin", res.data.admin);
              successNotification("Login Successful");
              router.push(admin_prefix || " /");
            } else {
              // otp sent, go to step 2
              adminSuccessNotification("OTP sent");

              updateState({
                step: 2,
                form_step: 2,
                end: moment().add(2, "minutes"),
              });
            }
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  if (isLoading) return <Loading />;

  if (admin) {
    redirect(admin_prefix || "/");
  }

  return (
    <ToastWrapper>
      <div className="rounded h-screen w-screen flex justify-center items-center flex-col p-4">
        <p className="text-2xl my-3">Login to admin</p>
        <OtpVerificationWrapper
          form_step={state.form_step}
          onSubmit={onSubmit}
          onChange={onChange}
          otp={state.otp}
          resend={() => {
            updateState({ step: 1 });
            submitWithState({ step: 1 });
          }}
          isSubmitting={isSubmitting}
          end={state.end}
        >
          <form
            onSubmit={onSubmit}
            className="bg-white shadow rounded w-full p-4"
          >
            <Input
              value={state.email}
              name="email"
              type="email"
              label="E-mail"
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
            <SubmitButton isSubmitting={isSubmitting} text="Login" />
          </form>
        </OtpVerificationWrapper>
      </div>
    </ToastWrapper>
  );
}
