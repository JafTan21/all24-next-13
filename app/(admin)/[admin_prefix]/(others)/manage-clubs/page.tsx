"use client";

import React, { useState } from "react";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import { LoginToClubButton } from "../../../../../hooks/api/useClub";
import useSearch from "../../../../../hooks/useSearch";
import { IClub } from "../../../../../libs/Models/Club";
import Add from "./Add";
import Edit from "./Edit";

export default function Manage(props: any) {
  const { data, paginator, SearchBar, refresh } = useSearch<IClub[]>({
    url: "/admin/club",
    params: {
      search_value: props.searchParams.club_name,
      club_name_only: !!props.searchParams.club_name,
    },
  });

  return (
    <AdminPageWrapper>
      <AdminTable
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

            <Td>Super Status</Td>

            <Td>Actions</Td>
          </tr>
        }
        title="Manage Clubs"
        searchBar={
          <div className="pt-2">
            <Add refresh={refresh} />
            {SearchBar}
          </div>
        }
      >
        {data && data.map((row) => <Maker initialRow={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
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
      <Td>
        {row.is_super ? (
          <>
            <p>Super Club</p>
            <p>Limit: {row.club_opening_limit}</p>
          </>
        ) : (
          "Normal Club"
        )}
      </Td>
      <Td>
        <Edit initialClub={row} initialClubSet={rowSet} />
        <LoginToClubButton club_id={row.id} />
      </Td>
    </tr>
  );
};
