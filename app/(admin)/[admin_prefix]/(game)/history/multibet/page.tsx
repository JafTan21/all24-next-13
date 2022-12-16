"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IMultibet } from "../../../../../../libs/Models/Multibet";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Username</Td>
      <Td>Games</Td>
      <Td>Rate</Td>
      <Td>Amount</Td>
      <Td>Return</Td>
      <Td>Date</Td>
      <Td>Status</Td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator, refresh } = useSearch<IMultibet[]>({
    url: "/admin/multibet",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Multibets History"
        searchBar={SearchBar}
      >
        {data && data.map((row: any) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: IMultibet }) => {
  return (
    <tr key={row.id} className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.username}</Td>
      <Td>
        <ul className="">
          {row.multibet_games.map((multibetGame, idx) => {
            return (
              <li key={idx} className="my-1.5">
                <b>{idx + 1}. </b>
                {multibetGame.game.team1}
                <span className="text-yellow-400"> vs </span>
                {multibetGame.game.team2}({multibetGame.game.short_description})
                <br />
                {multibetGame.question.question} <br />
                {multibetGame.answer.answer}
                <span
                  style={{
                    background: "blue",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    fontSize: ".8rem",
                    marginLeft: "5px",
                  }}
                  className="text-white"
                >
                  {Number(multibetGame.answer_rate).toFixed(2)}
                </span>
                (<StatusText status={multibetGame.answer.status} />)
              </li>
            );
          })}
        </ul>
      </Td>
      <Td>{Number(row.rate).toFixed(2)}</Td>
      <Td>{row.amount}</Td>
      <Td>{Number(row.amount) * Number(row.rate)}</Td>
      <Td>{row.date}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
    </tr>
  );
};
