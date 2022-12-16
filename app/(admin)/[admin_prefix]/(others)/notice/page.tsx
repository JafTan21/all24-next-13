"use client";

import axios from "axios";
import React from "react";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../hooks/useForm";
import useSearch from "../../../../../hooks/useSearch";
import { INotice } from "../../../../../libs/Models/Notice";

export default function Page() {
  const { data } = useSearch<{ notices: INotice[] }>({
    url: "/admin/notice",
    noPagination: true,
  });

  return (
    <AdminPageWrapper title="Add Notice">
      <div className="bg-white p-3">
        {data &&
          Object.entries(data.notices).map(([key, value]) => {
            return <Notice notice={value} key={key} />;
          })}
      </div>
    </AdminPageWrapper>
  );
}

const Notice = ({ notice }: { notice: INotice }) => {
  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      notice: notice.notice,
      key: notice.key,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put(`/admin/notice/${notice.id}`, state)
          .then(resolve)
          .catch(reject);
      });
    },
  });

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <p className="text-xl text-gray-500"> {notice.key}:</p>
      <textarea
        value={state.notice}
        name={"notice"}
        onChange={onChange}
        rows={5}
        className="w-full border border-gray-300 shadow rounded px-3 py-2 focus:outline-none"
      ></textarea>

      <SubmitButton
        classNames="flex justify-center items-center w-full h-10 font-bold transition duration-300 bg-green-600 rounded text-indigo-50 hover:bg-green-500"
        isSubmitting={isSubmitting}
        text="Save"
      />
    </form>
  );
};
