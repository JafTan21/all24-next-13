"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import Td from "../../../../../../components/Html/Td";
import { IDeposit } from "../../../../../../libs/Models/Deposit";
import useHistoryPage from "../../useHistoryPage";
import TableHeader from "../Header";

export default function History() {
  const { page } = useHistoryPage({
    url: "/admin/deposit/admin_index",
    title: "Deposit History",
    header: <TableHeader />,
    Maker,
  });

  return page;
}

const Maker = ({ row }: { row: IDeposit }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.username}</Td>
      <Td>{Number(row.amount).toFixed(2)}$</Td>
      <Td>{row.from}</Td>
      <Td>{row.to}</Td>
      <Td>{row.method}</Td>
      <Td>{row.transaction_number}</Td>
      <Td>{row.date}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>
        <></>
      </Td>
    </tr>
  );
};
