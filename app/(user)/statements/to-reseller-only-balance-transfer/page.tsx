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
import StatusText from "../../../../components/Html/StatusText";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({
    url: "/user/UserToResellerBalanceTransfer",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>From</Td>
      <Td>To</Td>
      <Td>Amount</Td>
      <Td>Date</Td>
      <Td>Status</Td>
    </tr>
  );

  const make = (row: IBalanceTransfer) => {
    return (
      <tr key={row.id}>
        <td className="w-4 p-4">{row.id}</td>
        <Td>{row.from.username}</Td>
        <Td>{row.to.username}</Td>
        <Td>{row.amount}</Td>
        <Td>{FormatDate(row.created_at, DateFormatShow)}</Td>
        <Td>
          <StatusText status={row.status} />
        </Td>
      </tr>
    );
  };

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        Resller Balance Transfer Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((row: any) => make(row))}
      </Table>
    </UserPageWrapper>
  );
}
