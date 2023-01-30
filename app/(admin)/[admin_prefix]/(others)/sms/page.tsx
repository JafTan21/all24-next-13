"use client";

import React from "react";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../hooks/useSearch";
import { SendSMS } from "./SendSMS";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Message</Td>
      <Td>Date</Td>
    </tr>
  );
}

interface ITextMessage {
  message: string;
  to: string;

  id: number;
  date: string;
}

export default function Messages() {
  const { SearchBar, data, paginator, refresh } = useSearch<ITextMessage[]>({
    url: "/admin/get-text-messages",
  });

  return (
    <AdminPageWrapper>
      <SendSMS refresh={refresh} />
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Text Messages"
        searchBar={SearchBar}
      >
        {data &&
          data.map((row: any) => <Maker {...{ row, refresh }} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: ITextMessage }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.message}</Td>
      <Td>{row.date}</Td>
    </tr>
  );
};
