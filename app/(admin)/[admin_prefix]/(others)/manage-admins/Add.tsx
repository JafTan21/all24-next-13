"use client";

import axios from "axios";
import React from "react";
import { BiPlus } from "react-icons/bi";
import { AdminConfig } from "../../../../../app.config";
import { AdminInput, AdminSelect } from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import useModal, { Modal } from "../../../../../hooks/useModal";
import { IAdmin } from "../../../../../libs/Models/Admin";

export default function Add({ refresh }: { refresh: () => void }) {
  const props = useModal({ title: "Add Admin" });
  const { state, onChange, onSubmit, isSubmitting, updateState } = useForm<
    Partial<IAdmin> & { password: string }
  >({
    initialState: {
      email: "",
      phone: "",
      password: "",
      admin_type_text: AdminConfig.SuperAdminPrefix,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/admin", state)
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
        <BiPlus /> Add Admin
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

          <SubmitButton isSubmitting={isSubmitting} text="Update" />
        </form>
      </Modal>
    </>
  );
}
