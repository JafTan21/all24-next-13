"use client";

import React from "react";
import StatusText from "../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../hooks/useSearch";
import FormaTdate, {
  DateFormatShow,
} from "../../../../../utils/helpers/DateHelper";

export default function Profits() {
  const { data, paginator, SearchBar } = useSearch({
    url: "/admin/option-game",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Username</Td>
            <Td>Selected </Td>
            <Td>Winning </Td>
            <Td>Amount</Td>
            <Td>Rate</Td>
            <Td>Possible Return</Td>
            <Td>Status</Td>
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
      <Td>{row.user.username}</Td>
      <Td>{row.selected_option}</Td>
      <Td>{row.winning_option}</Td>
      <Td>{row.amount}</Td>
      <Td>{row.rate}</Td>
      <Td>{row.possible_return}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>{FormaTdate(row.created_at, DateFormatShow)}</Td>
    </tr>
  );
};
