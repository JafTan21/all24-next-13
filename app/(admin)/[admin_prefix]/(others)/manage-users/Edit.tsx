"use client";

import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import useClubs from "../../../../../hooks/api/useClubs";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IUser } from "../../../../../libs/Models/User";

export default function Edit({
  initialUserSet,
  initialUser,
}: {
  initialUser: IUser;
  initialUserSet: (g: IUser) => void;
}) {
  const props = useModal({ title: "Edit User" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    IUser & { password: string }
  >({
    initialState: { ...initialUser, password: "" },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/user/" + state.id, state)
          .then((res) => {
            initialUserSet(res.data.user);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });
  const { clubs } = useClubs();

  return (
    <>
      <button
        onClick={props.openModal}
        className="rounded bg-blue-600 p-1 text-white"
      >
        <span className="flex-center-center">
          <BiEdit /> Edit
        </span>
      </button>

      <Modal {...props}>
        <form onSubmit={onSubmit} className="w-full">
          <AdminInput
            value={state.name}
            name="name"
            label="Full Name"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.username}
            name="username"
            label="Username"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.phone}
            name="phone"
            label="Phone"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.email}
            name="email"
            label="E-mail"
            onChange={onChange}
            type="email"
            required={true}
          />
          <AdminInput
            value={state.balance}
            name="balance"
            label="Balance"
            onChange={onChange}
            readonly={true}
            type="number"
          />
          <AdminInput
            value={state.sponsor_rate}
            name="sponsor_rate"
            label="Sponsor Rate"
            onChange={onChange}
          />

          <AdminInput
            value={state.min_deposit}
            name="min_deposit"
            label="Minimum Deposit"
            onChange={onChange}
          />
          <AdminInput
            value={state.max_deposit}
            name="max_deposit"
            label="Maximum Deposit"
            onChange={onChange}
          />

          <AdminInput
            value={state.min_withdraw}
            name="min_withdraw"
            label="Minimum Withdraw"
            onChange={onChange}
          />
          <AdminInput
            value={state.max_withdraw}
            name="max_withdraw"
            label="Maximum Wihdraw"
            onChange={onChange}
          />
          <AdminSelect
            value={state.club_id}
            name="club_id"
            label="Club"
            onChange={onChange}
            required={true}
          >
            {clubs &&
              clubs.map((club: any) => (
                <option value={club.id} key={club.id}>
                  {club.name}
                </option>
              ))}
          </AdminSelect>

          <AdminInput
            value={state.password}
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
          />

          <div className="flex-center-center">
            <ToggleButton
              on="Active"
              off="Inactive"
              isActive={state.is_active}
              onClick={(e) => {
                updateState({ is_active: !state.is_active });
              }}
              withDiv={true}
              classNames="p-2"
              label="Is Active:"
            />
            <ToggleButton
              on="Super"
              withDiv={true}
              off="Normal"
              isActive={state.is_super}
              onClick={(e) => {
                updateState({ is_super: !state.is_super });
              }}
              classNames="p-2"
              label="User Type:"
            />
          </div>

          <div className="flex-center-center mt-2">
            <ToggleButton
              on="On"
              off="Off"
              isActive={state.can_transfer_balance}
              onClick={(e) => {
                updateState({
                  can_transfer_balance: !state.can_transfer_balance,
                });
              }}
              withDiv={true}
              classNames="p-2"
              label="Can transfer balance:"
            />
          </div>

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Modal>
    </>
  );
}
