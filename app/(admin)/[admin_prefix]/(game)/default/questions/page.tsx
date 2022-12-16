"use client";

import axios from "axios";
import React from "react";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../../hooks/useForm";
import useSearch from "../../../../../../hooks/useSearch";
import { IRefresh } from "../../../../../../libs/interfaces";
import { IDefaultQuestion } from "../../../../../../libs/Models/DefaultQuestion";
import { Add } from "./Add";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <td>game name</td>
      <td>question</td>
      <td>actions</td>
    </tr>
  );
}

export default function DefaultQuestions() {
  const { SearchBar, data, paginator, refresh } = useSearch<IDefaultQuestion[]>(
    {
      url: "/admin/DefaultQuestion",
      noPagination: true,
    }
  );

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Default Questions"
        searchBar={SearchBar}
        beforeSearchBar={<Add refresh={refresh} />}
      >
        {data &&
          data.map((row) => <Maker row={row} key={row.id} refresh={refresh} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row, refresh }: { row: IDefaultQuestion } & IRefresh) => {
  const { onSubmit, isSubmitting } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("/admin/DefaultQuestion/" + row.id)
          .then((res) => {
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <td>{row.game_name}</td>
      <td>{row.question}</td>
      <td>
        <form onSubmit={onSubmit}>
          <SubmitButton
            isSubmitting={isSubmitting}
            text="Delete"
            classNames="bg-red-500 rounded text-white px-2 py-1"
          />
        </form>
      </td>
    </tr>
  );
};
