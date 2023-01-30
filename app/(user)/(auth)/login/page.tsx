"use client";
import axios from "axios";
import React, { useState } from "react";
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
import Link from "next/link";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const { user, isLoading } = useUser();

  const [show, showSet] = useState(false);
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
            if (res.data.is_club) {
              setCookie(ClubConfig.club_token, res.data.club_token, {
                expires: moment().add(60, "days").toDate(),
              });
              window.location.href = "/club";
            } else {
              setCookie(AppConfig.user_token, res.data.token, {
                expires: moment().add(60, "days").toDate(),
              });
              mutate("/user/user", res.data.user);
              successNotification("Login Successful");
              window.location.href = "/home";
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
      <BackBox title="Login">
        <form onSubmit={onSubmit}>
          <Input
            value={state.email}
            name="email"
            type="text"
            label="E-mail or Username"
            onChange={onChange}
            required={true}
          />
          <Input
            value={state.password}
            name="password"
            label="Password"
            onChange={onChange}
            type={show ? "text" : "password"}
            required={true}
          />
          <div className="flex  items-center">
            <input
              type="checkbox"
              id="show-password"
              onChange={(e) => {
                showSet(e.target.checked);
              }}
            />
            <label
              htmlFor="show-password"
              className="mx-1 text-gray-600 text-sm"
            >
              Show Password
            </label>
          </div>

          <Link
            href="/forget-password"
            className="inline-block mt-4 text-sm text-gray-700 transition duration-200 hover:text-indigo-600 hover:underline hover:cursor-pointer"
          >
            forget password
          </Link>
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </BackBox>
    </ToastWrapper>
  );
}
