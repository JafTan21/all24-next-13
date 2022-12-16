"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import Td from "../../../../../../components/Html/Td";
import { IBalanceTransfer } from "../../../../../../libs/Models/BalanceTransfer";
import FormatDate, {
  DateFormatShow,
} from "../../../../../../utils/helpers/DateHelper";
import useHistoryPage from "../../useHistoryPage";
import TableHeader from "../Header";

export default function History() {
  const { page } = useHistoryPage({
    url: "/admin/UserToResellerBalanceTransfer/admin_index",
    title: "To Reseller Transfer History",
    header: <TableHeader />,
    Maker,
  });

  return page;
}

const Maker = ({ row }: { row: IBalanceTransfer }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td>{row.id}</td>
      <td>{row.from.username}</td>
      <td>{row.to.username}</td>
      <td>{row.amount}</td>
      <td>{FormatDate(row.created_at, DateFormatShow)}</td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>
        <></>
      </Td>
    </tr>
  );
};
