"use client";

import React, { useEffect, useState } from "react";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import { LoginToUserButton } from "../../../../../hooks/api/useUser";
import useSearch from "../../../../../hooks/useSearch";
import { IUser } from "../../../../../libs/Models/User";
import Edit from "./Edit";
import useClubs from "../../../../../hooks/api/useClubs";
import { AdminSelect } from "../../../../../components/Html/Input";
import queryString from "query-string";

export default function Manage(props: any) {
  const { clubs } = useClubs();
  const [club_id, club_idSet] = useState<number | string>("");

  const { data, paginator, SearchBar, fetchDataWithParams } = useSearch<
    IUser[]
  >({
    url: "/admin/user",
    isUserManagePage: true,
  });

  useEffect(() => fetchDataWithParams({ club_id }), [club_id]);

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Name</Td>
            <Td>Email</Td>
            <Td>Username</Td>
            <Td>Phone</Td>
            <Td>Balance</Td>

            <Td>Sponsor</Td>
            <Td>Sponsor Rate</Td>
            <Td>Club</Td>

            <Td>Is Super ID</Td>
            <Td>Is Active</Td>
            <Td>Balance transfer</Td>

            <Td>Withdraw limit</Td>
            <Td>Deposit limit</Td>

            <Td>Actions</Td>
          </tr>
        }
        title="Manage Users"
        beforeSearchBar={
          <AdminSelect
            value={club_id}
            name="club_id"
            label="Club"
            onChange={(e) => club_idSet(e.target.value)}
            required={true}
            enableDefault={true}
          >
            {clubs &&
              clubs.map((club: any) => (
                <option value={club.id} key={club.id}>
                  {club.name}
                </option>
              ))}
          </AdminSelect>
        }
        searchBar={SearchBar}
      >
        {data && data.map((row) => <Maker initialRow={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ initialRow }: { initialRow: IUser }) => {
  const [row, rowSet] = useState(initialRow);

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.name}</Td>
      <Td>{row.email}</Td>
      <Td>{row.username}</Td>
      <Td>{row.phone}</Td>
      <Td>৳ {row.balance}</Td>

      <Td>{row.sponsor_username}</Td>
      <Td>{row.sponsor_rate}</Td>
      <Td>{row.club_name}</Td>

      <Td>{row.is_super ? "Super ID" : "Normal"}</Td>
      <Td>{row.is_active ? "Active" : "In-active"}</Td>
      <Td>{row.can_transfer_balance ? "On" : "Off"}</Td>
      <Td>
        <span>Min: {row.min_withdraw}</span> <br />
        <span>Max: {row.max_withdraw}</span>
      </Td>
      <Td>
        <span>Min: {row.min_deposit}</span> <br />
        <span>Max: {row.max_withdraw}</span>
      </Td>

      <Td>
        <Edit initialUser={row} initialUserSet={rowSet} />
        <LoginToUserButton user_id={row.id} />
      </Td>
    </tr>
  );
};
