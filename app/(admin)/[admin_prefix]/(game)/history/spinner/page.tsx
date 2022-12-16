"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { ISpinnerTicket } from "../../../../../../libs/Models/SpinnerTicket";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Username</Td>
      <Td>Name</Td>
      <Td>Win Name</Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible Return</Td>
      <Td>Status</Td>
      <Td>Date</Td>
    </tr>
  );
}

export default function Statement() {
  const { SearchBar, data, paginator } = useSearch<ISpinnerTicket[]>({
    url: "/admin/SpinnerTicket",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Spinner History"
        searchBar={SearchBar}
      >
        {data && data.map((row: any) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: ISpinnerTicket }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.username}</Td>
      <Td>{row.name}</Td>
      <Td>{row.win_name}</Td>
      <Td>{row.amount}</Td>
      <Td>{row.rate}</Td>
      <Td>{row.possible_return}</Td>

      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>{row.date}</Td>
    </tr>
  );
};
