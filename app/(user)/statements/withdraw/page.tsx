"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import { Status } from "../../../../libs/Status";
import { IWithdraw } from "../../../../libs/Models/Withdraw";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({ url: "/user/withdraw" });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Amount</Td>
      <Td>To</Td>
      <Td>Account Type</Td>
      <Td>Date</Td>
      <Td>Status</Td>
    </tr>
  );

  const make = (row: IWithdraw) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{row.id}</Td>
        <Td>
          <span>{Number(row.amount).toFixed(2)}$</span>
        </Td>
        <Td>{row.to}</Td>
        <Td>{row.method}</Td>
        <Td>{row.date}</Td>
        <Td>
          <span
            className={
              row.status == Status.Approved
                ? "text-green-500"
                : row.status == Status.Rejected
                ? "text-red-500"
                : "text-blue-400"
            }
          >
            {row.status_text}
          </span>
        </Td>
      </tr>
    );
  };

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        Withdraw Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any) => make(bet))}
      </Table>
    </UserPageWrapper>
  );
}
