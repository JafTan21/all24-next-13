"use client";

import axios from "axios";
import React, { useEffect } from "react";
import { mutate } from "swr";
import AppConfig from "../../../../app.config";
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
import useClubs from "../../../../hooks/api/useClubs";
moment().format();

export default function Register() {
  const { user, error, isLoading } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      name: "",
      username: "",
      email: "",
      phone: "",
      sponsor_username: "",
      club_id: "",
      confirm_password: "",
      password: "",
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/register", state)
          .then((res) => {
            setCookie(AppConfig.user_token, res.data.token, {
              expires: moment().add(60, "days").toDate(),
            });
            mutate("/user/user", res.data.user);
            resolve(res.data);

            successNotification(res.data.message);
          })
          .catch(reject);
      });
    },
  });
  const { clubs, isLoading: clubsIsLoading } = useClubs();

  if (isLoading || clubsIsLoading) return <Loading />;

  if (user) {
    redirect("/home");
  }

  return (
    <ToastWrapper>
      <BackBox title="Register">
        <form onSubmit={onSubmit}>
          <Input
            value={state.name}
            name="name"
            label="Full Name"
            onChange={onChange}
            required={true}
          />
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
            value={state.email}
            name="email"
            label="E-mail"
            onChange={onChange}
            type="email"
            required={true}
          />
          <Input
            value={state.sponsor_username}
            name="sponsor_username"
            label="Sponsor Username"
            onChange={onChange}
            required={true}
          />
          <div className="my-2">
            <span className="text-gray-900 text-sm">Select Club</span>
            <select
              required
              name="club_id"
              onChange={onChange}
              value={state.club_id}
              className="block w-full p-2  bg-transparent border-b rounded appearance-none focus:outline-none"
            >
              <option value="" disabled>
                --- Select ---
              </option>
              {clubs.map((club: any) => (
                <option value={club.id} key={club.id}>
                  {club.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            value={state.password}
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
            required={true}
          />
          <Input
            value={state.confirm_password}
            name="confirm_password"
            type="password"
            label="Confirm password"
            onChange={onChange}
            required={true}
          />

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </BackBox>
    </ToastWrapper>
  );
}
