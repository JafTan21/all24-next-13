"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IBet } from "../../../../../../libs/Models/Bet";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>User</Td>
      <Td>Game</Td>
      <Td>Description</Td>
      <Td>Question</Td>
      <Td>Answer</Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible Return</Td>
      <Td>Status</Td>
      <Td>Date</Td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator, refresh } = useSearch<IBet[]>({
    url: "/admin/bet",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Bets History"
        searchBar={SearchBar}
      >
        {data && data.map((row: any) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: IBet }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.username}</Td>
      <Td>{row.game}</Td>
      <Td>{row.short_description}</Td>
      <Td>{row.question}</Td>
      <Td>{row.answer}</Td>
      <Td>{row.amount}</Td>
      <Td>{row.rate}</Td>
      <Td>{Number(row.amount) * Number(row.rate)}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>{row.date}</Td>
    </tr>
  );
};
