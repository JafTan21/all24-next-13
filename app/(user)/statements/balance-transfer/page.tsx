"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import FormatDate, {
  DateFormatShow,
} from "../../../../utils/helpers/DateHelper";
import { IBalanceTransfer } from "../../../../libs/Models/BalanceTransfer";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({
    url: "/user/BalanceTransfer",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Type</Td>
      <Td>From</Td>
      <Td>To</Td>
      <Td>Amount</Td>
      <Td>Date</Td>
    </tr>
  );

  const make = (row: IBalanceTransfer) => {
    return (
      <tr key={row.id}>
        <td className="w-4 p-4">{row.id}</td>
        <Td>{row.type}</Td>
        <Td>{row.from.username}</Td>
        <Td>{row.to.username}</Td>
        <Td>{row.amount}</Td>
        <Td>{FormatDate(row.created_at, DateFormatShow)}</Td>
      </tr>
    );
  };

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        Balance Transfer Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((row: any) => make(row))}
      </Table>
    </UserPageWrapper>
  );
}
