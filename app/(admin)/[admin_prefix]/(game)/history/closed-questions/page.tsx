"use client";

import axios from "axios";
import React from "react";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../../hooks/useForm";
import useSearch from "../../../../../../hooks/useSearch";
import { IGame } from "../../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../../libs/Models/Question";
import { Status } from "../../../../../../libs/Status";

type ClosedQuestion = Partial<IGame> & Partial<IQuestion>;

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <td>Game</td>
      <td>Question</td>
      <td>Closed on</td>
      <td>Actions</td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator, refresh } = useSearch<ClosedQuestion[]>({
    url: "/admin/closed-questions",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Closed Question History"
        searchBar={SearchBar}
      >
        {data &&
          data.map((row: any) => (
            <Maker row={row} key={row.id} refresh={refresh} />
          ))}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({
  row,
  refresh,
}: {
  row: ClosedQuestion;
  refresh: () => void;
}) => {
  const { update } = useForm<ClosedQuestion>({
    initialState: row,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/question/" + row.id, {
            ...state,
            with_answers: true,
          })
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
      <td>
        {row.team1}
        <span className="text-yellow-500 mx-1">vs</span>
        {row.team2}
      </td>
      <td>{row.question}</td>
      <td>{row.closed_on}</td>

      <Td>
        <button
          onClick={() => {
            update({
              status: Status.Live,
              show_to_users: false,
            });
          }}
          className="text-white bg-green-500 p-2"
        >
          back live
        </button>
      </Td>
    </tr>
  );
};
