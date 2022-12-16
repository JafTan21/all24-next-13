"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import Td from "../../../../../../components/Html/Td";
import { IClubWithdraw } from "../../../../../../libs/Models/ClubWithdraw";
import useHistoryPage from "../../useHistoryPage";
import TableHeader from "../Header";

export default function History() {
  const { page } = useHistoryPage({
    url: "/admin/ClubWithdraw/admin_index",
    title: "Club Withdraw History",
    header: <TableHeader />,
    Maker,
  });

  return page;
}

const Maker = ({ row }: { row: IClubWithdraw }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.club_name}</Td>
      <Td>{Number(row.amount).toFixed(2)}$</Td>
      <Td>{row.super_id}</Td>
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
