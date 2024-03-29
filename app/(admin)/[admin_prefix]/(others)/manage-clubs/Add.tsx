"use client";

import axios from "axios";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { AdminInput } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IClub } from "../../../../../libs/Models/Club";

export default function Add({ refresh }: { refresh: () => void }) {
  const props = useModal({ title: "Add Club" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    Partial<IClub> & { owner_password: string }
  >({
    initialState: {
      name: "",
      balance: 0,
      is_active: true,
      commission_rate: undefined,
      owner_email: "",
      owner_phone: "",
      owner_password: "",
      min_withdraw: undefined,
      max_withdraw: undefined,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/club", state)
          .then((res) => {
            refresh();
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
        className="bg-green-500 text-white flex-center-center px-3 py-2 rounded shadow"
      >
        <BiPlus /> Add Club
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
            type="email"
            onChange={onChange}
          />
          <AdminInput
            value={state.owner_phone}
            name="owner_phone"
            label="Owner Phone"
            onChange={onChange}
          />
          <AdminInput
            value={state.owner_password}
            name="owner_password"
            label="Owner Password"
            type="password"
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
          <AdminInput
            value={state.balance}
            name="balance"
            label="Club Balance"
            onChange={onChange}
          />
          <div className="flex-center-center">
            <ToggleButton
              on="Active"
              off="Inactive"
              isActive={!!state.is_active}
              onClick={(e) => updateState({ is_active: !state.is_active })}
              classNames="p-2"
              withDiv={true}
              label="Is Active:"
            />
            <ToggleButton
              on="Super"
              off="Normal"
              isActive={!!state.is_super}
              onClick={(e) => updateState({ is_super: !state.is_super })}
              classNames="p-2"
              className="ml-4"
              withDiv={true}
              label="Is Super:"
            />
          </div>

          {state.is_super && (
            <>
              <AdminInput
                value={state.club_opening_limit}
                name="club_opening_limit"
                label="Club Opening Limit"
                onChange={onChange}
                required={true}
                type="number"
              />
              <AdminInput
                value={state.super_commission_rate}
                name="super_commission_rate"
                label="Super Commission"
                onChange={onChange}
                required={true}
                type="number"
              />
            </>
          )}

          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
}
