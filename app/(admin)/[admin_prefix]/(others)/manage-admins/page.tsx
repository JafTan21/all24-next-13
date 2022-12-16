"use client";

import React, { useState } from "react";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../hooks/useSearch";
import { IAdmin } from "../../../../../libs/Models/Admin";
import Add from "./Add";
import Edit from "./Edit";

export default function Manage() {
  const { data, paginator, SearchBar, refresh } = useSearch<IAdmin[]>({
    url: "/admin/admin",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Email</Td>
            <Td>Is Active</Td>
            <Td>Type</Td>
            <Td>Actions</Td>
          </tr>
        }
        title="Manage Users"
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

const Maker = ({ initialRow }: { initialRow: IAdmin }) => {
  const [row, rowSet] = useState(initialRow);

  return (
    <tr className="hover:bg-gray-100">
      <Td className="p-4">{row.id}</Td>
      <Td>{row.email}</Td>
      <Td>{row.is_active ? "Active" : "Inactive"}</Td>
      <Td>{row.admin_type_text}</Td>
      <Td>
        <Edit initialAdmin={row} initialAdminSet={rowSet} />
      </Td>
    </tr>
  );
};
