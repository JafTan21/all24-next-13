"use client";
import axios from "axios";
import React from "react";
import { mutate } from "swr";
import AppConfig, { ClubConfig } from "../../../../app.config";
import Input from "../../../../components/Html/Input";
import useUser from "../../../../hooks/api/useUser";
import BackBox from "../../../../components/Html/BackBox";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import Loading from "../../../../components/Html/Loading";
import { redirect } from "next/navigation";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import { setCookie } from "cookies-next";
import moment from "moment";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";
import { IOtp } from "../../../../libs/Models/OTP";
import OtpVerificationWrapper from "../../../../components/Wrappers/OtpVerificationWrapper";

interface IForgetPassword {
  username: string;
  phone: string;
  password: string;
}

export default function ForgetPassword() {
  const { user, isLoading } = useUser();

  const {
    state,
    onChange,
    onSubmit,
    isSubmitting,
    updateState,
    submitWithState,
  } = useForm<IForgetPassword & IOtp>({
    initialState: {
      username: "",
      phone: "",
      password: "",

      otp: "",
      end: undefined,
      step: 1,
      form_step: 1,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/reset-password", state)
          .then((res) => {
            console.log(res);
            if (res.data.message) {
              successNotification(res.data.message);
              window.location.href = "/login";
            } else {
              // otp sent, go to step 2
              successNotification("OTP sent");

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

  if (user) {
    redirect("/home");
  }

  return (
    <ToastWrapper>
      <BackBox title="Request password change">
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
          <form onSubmit={onSubmit}>
            <Input
              value={state.username}
              name="username"
              label="Username"
              onChange={onChange}
              required={true}
            />
            <Input
              value={state.phone}
              name="phone"
              label="Phone"
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
        </OtpVerificationWrapper>
      </BackBox>
    </ToastWrapper>
  );
}
