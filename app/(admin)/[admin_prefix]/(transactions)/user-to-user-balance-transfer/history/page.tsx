"use client";

import React from "react";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IBalanceTransfer } from "../../../../../../libs/Models/BalanceTransfer";
import FormatDate, {
  DateFormatShow,
} from "../../../../../../utils/helpers/DateHelper";

export default function BalanceTransferHistory() {
  const { SearchBar, data, paginator } = useSearch<IBalanceTransfer[]>({
    url: "/admin/BalanceTransfer",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Type</Td>
            <Td>From</Td>
            <Td>To</Td>
            <Td>Amount</Td>
            <Td>Date</Td>
          </tr>
        }
        title="Balance Transfer History"
        searchBar={SearchBar}
      >
        {data && data.map((row: any) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: IBalanceTransfer }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="w-4 p-4">{row.id}</td>
      <Td>{row.type}</Td>
      <Td>{row.from.username}</Td>
      <Td>{row.to.username}</Td>
      <Td>{row.amount}</Td>
      <Td>{FormatDate(row.created_at, DateFormatShow)}</Td>
    </tr>
  );
};
