import axios from "axios";
import React, { useContext, useState } from "react";
import Input from "../../../../components/Html/Input";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useUser from "../../../../hooks/api/useUser";
import useForm from "../../../../hooks/useForm";
import {
  errorNotification,
  successNotification,
} from "../../../../utils/helpers/NotificationHelper";

const PasswordChangeForm = () => {
  const { user, mutateUser, isLoading } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      old_password: "",
      new_password: "",
      confirm_password: "",
      user_id: user?.id,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        if (state.new_password != state.confirm_password) {
          errorNotification("Passwords don't match");
          reject();
          return;
        }

        axios
          .put("/user/change-password", state)
          .then((res) => {
            successNotification(res.data.message);
            mutateUser(res.data.user);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  if (isLoading) return null;

  return (
    <div className="w-full mt-5 md:w-1/2 ">
      <form className="mx-1 bg-white  rounded" onSubmit={onSubmit}>
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
        <SubmitButton isSubmitting={isSubmitting} text="Change Password" />
      </form>
    </div>
  );
};

export default PasswordChangeForm;
