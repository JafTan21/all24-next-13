"use client";

import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IClub } from "../../../../../libs/Models/Club";

export default function Edit({
  initialClubSet,
  initialClub,
}: {
  initialClub: IClub;
  initialClubSet: (g: IClub) => void;
}) {
  const props = useModal({ title: "Edit Club" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    IClub & { owner_password: string }
  >({
    initialState: { ...initialClub, owner_password: "" },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/club/" + state.id, state)
          .then((res) => {
            initialClubSet(res.data.club);
            resolve(res.data);
            props.closeModal();
          })
          .catch(reject);
      });
    },
  });

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
            label="Name"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.balance}
            name="balance"
            label="Balance"
            onChange={onChange}
            readonly={true}
          />
          <AdminInput
            value={state.commission_rate}
            name="commission_rate"
            label="Commission Rate"
            onChange={onChange}
            required={true}
          />

          <AdminInput
            value={state.owner_email}
            name="owner_email"
            label="Owner E-mail"
            onChange={onChange}
            required={true}
          />
          <AdminInput
            value={state.owner_phone}
            name="owner_phone"
            label="Owner Phone"
            onChange={onChange}
            required={true}
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

          <AdminInput
            value={state.owner_password}
            name="owner_password"
            label="Password"
            type="password"
            onChange={onChange}
          />

          <div className="flex-center-center">
            <ToggleButton
              on="Active"
              off="Inactive"
              isActive={state.is_active}
              onClick={(e) => updateState({ is_active: !state.is_active })}
              classNames="p-2"
              withDiv={true}
              label="Is Active:"
            />
            <ToggleButton
              on="Super"
              off="Normal"
              isActive={state.is_super}
              onClick={(e) => updateState({ is_super: !state.is_super })}
              classNames="p-2"
              className="ml-4"
              withDiv={true}
              label="Is Super:"
            />
          </div>
          {state.is_super && (
            <AdminInput
              value={state.club_opening_limit}
              name="club_opening_limit"
              label="Club Opening Limit"
              onChange={onChange}
              required={true}
            />
          )}

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Modal>
    </>
  );
}
