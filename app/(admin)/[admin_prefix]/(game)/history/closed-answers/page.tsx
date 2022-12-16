"use client";

import axios from "axios";
import React from "react";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../../hooks/useForm";
import useSearch from "../../../../../../hooks/useSearch";
import { IAnswer } from "../../../../../../libs/Models/Answer";
import { IGame } from "../../../../../../libs/Models/Game";
import { Status } from "../../../../../../libs/Status";

type ClosedAnswer = Partial<IGame> & {
  closed_on: string;
  question: string;
  game_id: number;
  answer: IAnswer;
};

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <td>Game</td>
      <td>Question</td>
      <td>Answer</td>
      <td>Closed on</td>
      <td>Actions</td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator, refresh } = useSearch<ClosedAnswer[]>({
    url: "/admin/closed-answers",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Closed Answer History"
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
  row: ClosedAnswer;
  refresh: () => void;
}) => {
  const { update } = useForm<IAnswer>({
    initialState: { ...row.answer },
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/answer/" + row.id, state)
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
      <td>{row.answer.answer}</td>
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
