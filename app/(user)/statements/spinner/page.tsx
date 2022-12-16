"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";
import { ISpinnerTicket } from "../../../../libs/Models/SpinnerTicket";
import StatusText from "../../../../components/Html/StatusText";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({
    url: "/user/SpinnerTicket",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Name</Td>
      <Td>Win Name</Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible Return</Td>
      <Td>Status</Td>
      <Td>Date</Td>
    </tr>
  );

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        Spinner Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((row) => <Maker row={row} key={row.id} />)}
      </Table>
    </UserPageWrapper>
  );
}

const Maker = ({ row }: { row: ISpinnerTicket }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
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
