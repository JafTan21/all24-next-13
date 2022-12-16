"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IBet } from "../../../../../../libs/Models/Bet";
import { Status } from "../../../../../../libs/Status";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>User</Td>
      <Td>Game</Td>
      <Td>Question</Td>
      <Td>Answer</Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible return</Td>
      <Td>Refunded</Td>
      <Td>Status</Td>
      <Td>Date</Td>
      <Td>action by</Td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator } = useSearch<IBet[]>({
    url: "/admin/bets/refunds",
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
      <Td>{row.question}</Td>
      <Td>{row.answer}</Td>
      <Td>{row.amount}</Td>
      <Td>{row.rate}</Td>
      <Td>{row.possible_return}</Td>
      <Td>{(row.amount * row.refund_rate) / 100}</Td>
      <Td>
        {row.status_text}
        <span className="mx-1">
          {row.status == Status.Cashout ? row.cashout_rate + "%" : ""}
        </span>
        <span className="mx-1">
          {row.status == Status.Refund ? row.refund_rate + "%" : ""}
        </span>
      </Td>
      <Td>{row.date}</Td>
      <Td>{row.action_by}</Td>
    </tr>
  );
};
