"use client";
import axios from "axios";
import React from "react";
import { mutate } from "swr";
import AppConfig from "../../../app.config";
import Input from "../../../components/Html/Input";
import useUser from "../../../hooks/api/useUser";
import BackBox from "../../../components/Html/BackBox";
import SubmitButton from "../../../components/Html/SubmitButton";
import useForm from "../../../hooks/useForm";
import Loading from "../../../components/Html/Loading";
import { redirect } from "next/navigation";
import ToastWrapper from "../../../components/Wrappers/ToastWrapper";
import { setCookie } from "cookies-next";
import moment from "moment";
import { successNotification } from "../../../utils/helpers/NotificationHelper";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const { user, isLoading } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm<ILogin>({
    initialState: {
      email: "",
      password: "",
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/login", state)
          .then((res) => {
            setCookie(AppConfig.user_token, res.data.token, {
              expires: moment().add(60, "days").toDate(),
            });
            mutate("/user/user", res.data.user);
            resolve(res.data);

            successNotification("Login Successful");
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
      <BackBox title="Login">
        <form onSubmit={onSubmit}>
          <Input
            value={state.email}
            name="email"
            type="email"
            label="E-mail or Username"
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
    </ToastWrapper>
  );
}
