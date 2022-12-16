"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import FormatDate, {
  DateFormatShow,
} from "../../../../utils/helpers/DateHelper";
import ClubPageWrapper from "../../../../components/Wrappers/ClubPageWrapper";

interface IAllTransaction {
  id: number;
  user_id: number;
  type: string;
  balance: number;
  amount_in: number;
  amount_out: number;
  description: string;
  created_at: string;
}

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({
    url: "/user/all-transaction",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Type</Td>
      <Td>Amount In</Td>
      <Td>Amount out</Td>
      <Td>Balance</Td>
      <Td>Description</Td>
      <Td>Date</Td>
    </tr>
  );

  const make = (row: IAllTransaction) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{row.id}</Td>
        <Td>{row.type}</Td>
        <Td className="text-green-400">
          {row.amount_in ? "+" + row.amount_in : ""}
        </Td>
        <Td className="text-red-400">
          {row.amount_out ? "-" + row.amount_out : ""}
        </Td>
        <Td>{row.balance}</Td>
        <Td>{row.description}</Td>
        <Td>{FormatDate(row.created_at, DateFormatShow)}</Td>
      </tr>
    );
  };

  return (
    <ClubPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">All Transaction</p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any) => make(bet))}
      </Table>
    </ClubPageWrapper>
  );
}
