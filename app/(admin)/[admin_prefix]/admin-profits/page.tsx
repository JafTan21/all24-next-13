"use client";

import React from "react";
import { AdminTable } from "../../../../components/Html/Table";
import Td from "../../../../components/Html/Td";
import AdminPageWrapper from "../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../hooks/useSearch";
import FormaTdate, {
  DateFormatShow,
} from "../../../../utils/helpers/DateHelper";

export default function Profits() {
  const { data, paginator, SearchBar } = useSearch({
    url: "/admin/admin-profits",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>From</Td>
            <Td>Amount in</Td>
            <Td>Amount Out</Td>
            <Td>Total</Td>
            <Td>Description</Td>
            <Td>Date</Td>
          </tr>
        }
        title="Admin Profits"
        searchBar={SearchBar}
      >
        {data && data.map((row) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: any }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="p-4">{row.id}</Td>
      <Td>{row.from}</Td>
      <Td>{row.amount_in}</Td>
      <Td>{row.amount_out}</Td>
      <Td>{row.total}</Td>
      <Td>{row.description}</Td>
      <Td>{FormaTdate(row.created_at, DateFormatShow)}</Td>
    </tr>
  );
};
