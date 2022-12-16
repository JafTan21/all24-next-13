"use client";

import axios from "axios";
import React from "react";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../../hooks/useForm";
import useSearch from "../../../../../../hooks/useSearch";
import { IGame } from "../../../../../../libs/Models/Game";
import { Status } from "../../../../../../libs/Status";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Game</Td>
      <Td>Total questions</Td>
      <Td>Total answer</Td>
      <Td>Total bets</Td>
      <Td>Closed on</Td>
      <Td>Actions</Td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator, refresh } = useSearch<IGame[]>({
    url: "/admin/closed-games",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Closed Game History"
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

const Maker = ({ row, refresh }: { row: IGame; refresh: () => void }) => {
  const { update } = useForm<IGame>({
    initialState: row,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/game/" + row.id, {
            ...state,
            with_questions_answers: true,
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
      <Td>
        {row.team1}
        <span className="text-yellow-500 mx-1">vs</span>
        {row.team2}
      </Td>
      <Td>{row.questions_count}</Td>
      <Td>{row.answers_count}</Td>
      <Td>{row.bets_count}</Td>
      <Td>{row.closed_on}</Td>
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
