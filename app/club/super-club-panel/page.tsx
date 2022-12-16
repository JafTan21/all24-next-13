"use client";

import React, { useState } from "react";
import Table from "../../../components/Html/Table";
import Td from "../../../components/Html/Td";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useSearch from "../../../hooks/useSearch";
import { IClub } from "../../../libs/Models/Club";
import Add from "./Add";

export default function SuperClub() {
  const { data, paginator, SearchBar, refresh } = useSearch<IClub[]>({
    url: "/club/club",
  });

  return (
    <ClubPageWrapper>
      <div className="bg-white p-2 m-2">
        <Add refresh={refresh} />
        {SearchBar}
      </div>
      <Table
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Name</Td>
            <Td>Balance</Td>
            <Td>User count</Td>
            <Td>User balance</Td>
            <Td>Owner Email</Td>
            <Td>Owner Phone</Td>
            <Td>Is Active</Td>
            <Td>Commission rate</Td>
            <Td>Withdraw limit</Td>
          </tr>
        }
      >
        {data && data.map((row) => <Maker initialRow={row} key={row.id} />)}
      </Table>
    </ClubPageWrapper>
  );
}

const Maker = ({ initialRow }: { initialRow: IClub }) => {
  const [row, rowSet] = useState(initialRow);

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>

      <Td>{row.name}</Td>
      <Td>৳{row.balance}</Td>
      <Td>{row.users_count}</Td>
      <Td>{row.users_sum_balance}</Td>
      <Td>{row.owner_email}</Td>
      <Td>{row.owner_phone}</Td>
      <Td>{row.is_active ? "Active" : "Inactive"}</Td>
      <Td>{row.commission_rate}</Td>
      <Td>
        <span>Min: {row.min_withdraw}</span> <br />
        <span>Max: {row.max_withdraw}</span>
      </Td>
    </tr>
  );
};
