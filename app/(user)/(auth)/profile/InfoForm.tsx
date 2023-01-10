import React, { useContext, useState } from "react";
import Input from "../../../../components/Html/Input";
import useForm from "../../../../hooks/useForm";
import useClubs from "../../../../hooks/api/useClubs";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useUser from "../../../../hooks/api/useUser";
import Loading from "../../../../components/Html/Loading";
import axios from "axios";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";

const InfoForm = () => {
  const { clubs, isLoading: clubsIsLoading } = useClubs();
  const { user, isLoading, mutateUser } = useUser();

  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      user_id: user?.id,
      name: user?.name,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      sponsor_username: user?.sponsor_id,
      club_id: user?.club_id,
      is_active: user?.is_active,
      is_super: user?.is_super,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/user/update-profile", state)
          .then((res) => {
            successNotification(res.data.message);
            mutateUser(res.data.user);

            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  if (isLoading || clubsIsLoading) return <Loading />;

  return (
    <div className="w-full mt-5 md:w-1/2 ">
      <form className="mx-1 bg-white " onSubmit={onSubmit}>
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
          value={state.email}
          onChange={onChange}
          name="email"
          required={true}
          readonly={true}
        />
        <Input
          label="Phone"
          value={state.phone}
          onChange={onChange}
          name="phone"
          required={true}
          readonly={true}
        />
        <Input
          label="Username"
          value={state.username}
          onChange={onChange}
          name="username"
          readonly={true}
          required={true}
        />
        <div className="my-2 text-gray-900 text-sm">
          Sponsor: {state.sponsor_username}
        </div>
        <div className="my-2 text-gray-900 text-sm">
          Is Active:
          {state.is_active ? (
            <span className="text-green-500">Active</span>
          ) : (
            <span className="text-red-500">Inactive</span>
          )}
        </div>
        <div className="my-2 text-gray-900 text-sm">
          Is Super ID:
          {state.is_super ? (
            <span className="text-blue-500">Super ID</span>
          ) : (
            <span className="text-blue-500">Normal</span>
          )}
        </div>
        <div className="my-2">
          <span className="text-gray-900 text-sm">Select Club</span>
          <select
            required
            value={state.club_id}
            onChange={onChange}
            name="club_id"
            className="w-full mt-1 text-sm border border-gray-400 bg-gray-200 text-gray-500 rounded-3xl px-4 py-2 appearance-none focus:outline-0"
          >
            <option value="" disabled>
              --- Select ---
            </option>
            {clubs.map((club: any) => {
              return (
                <option key={Math.random()} value={club.id}>
                  {club.name}
                </option>
              );
            })}
          </select>
        </div>
        <SubmitButton isSubmitting={isSubmitting} text="Update" />
      </form>
    </div>
  );
};

export default InfoForm;
