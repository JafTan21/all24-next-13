"use client";

import Link from "next/link";
import StatusText from "../../../components/Html/StatusText";
import Table from "../../../components/Html/Table";
import Td from "../../../components/Html/Td";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useSearch from "../../../hooks/useSearch";
import { IBet } from "../../../libs/Models/Bet";
import queryString from "query-string";

export default function Users() {
  const { user_id, username } = queryString.parse(location.search);

  const { data, SearchBar, paginator } = useSearch<IBet[]>({
    url: `/club/bets${user_id ? `?user_id=${user_id}` : ""}`,
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>User</Td>
      <Td>Game</Td>
      <Td>Question</Td>
      <Td>Answer</Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible Return</Td>
      <Td>Status</Td>
      <Td>Date</Td>
    </tr>
  );

  const make = (row: IBet) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{row.id}</Td>
        <Td>{row.username}</Td>
        <Td>{row.game}</Td>
        <Td>{row.question}</Td>
        <Td>{row.answer}</Td>
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

  return (
    <ClubPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">Club Users Bets</p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any) => make(bet))}
      </Table>
    </ClubPageWrapper>
  );
}
