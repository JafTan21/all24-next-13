"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({
    url: "/user/all-transaction",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Username</Td>
      <Td>Amount</Td>
    </tr>
  );

  const make = (row: any, idx: number) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{idx + 1}</Td>
        <Td>{row.username}</Td>
        <Td>{row.amount}</Td>
      </tr>
    );
  };

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        My Sponsor Earnings
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((d: any, idx) => make(d, idx))}
      </Table>
    </UserPageWrapper>
  );
}
