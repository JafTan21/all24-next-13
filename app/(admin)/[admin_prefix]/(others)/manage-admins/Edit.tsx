"use client";

import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AdminConfig } from "../../../../../app.config";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IAdmin } from "../../../../../libs/Models/Admin";
import FormatDate from "../../../../../utils/helpers/DateHelper";

export default function Edit({
  initialAdminSet,
  initialAdmin,
}: {
  initialAdmin: IAdmin;
  initialAdminSet: (g: IAdmin) => void;
}) {
  const props = useModal({ title: "Edit Admin" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    IAdmin & { password: string }
  >({
    initialState: { ...initialAdmin, password: "" },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/admin/" + state.id, state)
          .then((res) => {
            initialAdminSet(res.data.admin);
            props.closeModal();
            resolve(res.data);
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
            value={state.email}
            name="email"
            label="Email"
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
            value={state.password}
            name="password"
            label="Password"
            onChange={onChange}
          />
          <AdminSelect
            value={state.admin_type_text}
            name="admin_type_text"
            label="Admin Type"
            onChange={onChange}
            required={true}
          >
            <>
              <option value={AdminConfig.SuperAdminPrefix}>
                {AdminConfig.SuperAdminPrefix}
              </option>
              <option value={AdminConfig.TransactionAdminPrefix}>
                {AdminConfig.TransactionAdminPrefix}
              </option>
              <option value={AdminConfig.GameAdminPrefix}>
                {AdminConfig.GameAdminPrefix}
              </option>
              <option value={AdminConfig.CustomGameAdminPrefix}>
                {AdminConfig.CustomGameAdminPrefix}
              </option>
            </>
          </AdminSelect>
          <ToggleButton
            on="Active"
            off="Inactive"
            isActive={state.is_active}
            onClick={(e) => {
              updateState({ is_active: !state.is_active });
            }}
            classNames="p-2"
            label="Is Active:"
            withDiv={true}
          />
          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
}
