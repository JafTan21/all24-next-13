"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import Td from "../../../../../../components/Html/Td";
import { IWithdraw } from "../../../../../../libs/Models/Withdraw";
import useHistoryPage from "../../useHistoryPage";
import TableHeader from "../Header";

export default function History() {
  const { page } = useHistoryPage({
    url: "/admin/withdraw/admin_index",
    title: "Withdraw History",
    header: <TableHeader />,
    Maker,
  });

  return page;
}

const Maker = ({ row }: { row: IWithdraw }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.username}</Td>
      <Td>{row.to}</Td>
      <Td>{row.method}</Td>
      <Td>{Number(row.amount).toFixed(2)}$</Td>
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
