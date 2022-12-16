"use client";

import Link from "next/link";
import Table from "../../../components/Html/Table";
import Td from "../../../components/Html/Td";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useSearch from "../../../hooks/useSearch";
import { IUser } from "../../../libs/Models/User";

type ClubUser = IUser & {
  commission_earned: number;
  total_bet: number;
};

export default function Users() {
  const { data, SearchBar, paginator } = useSearch<ClubUser[]>({
    url: "/club/users",
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Name</Td>
      <Td>Email</Td>
      <Td>Username</Td>
      <Td>Sponsor</Td>
      <Td>Commission Earned</Td>
      <Td>Bet amount</Td>
      <Td>Bets</Td>
    </tr>
  );

  const make = (row: ClubUser) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{row.id}</Td>
        <Td>{row.name}</Td>
        <Td>{row.email}</Td>
        <Td>{row.username}</Td>
        <Td>{row.sponsor_username}</Td>
        <Td>{row.commission_earned}</Td>
        <Td>{row.total_bet}</Td>
        <Td>
          <Link
            href={`/club/bets?user_id=${row.id}&username=${row.username}`}
            className="text-blue-400"
          >
            Bets
          </Link>
        </Td>
      </tr>
    );
  };

  return (
    <ClubPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">Club Users</p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any) => make(bet))}
      </Table>
    </ClubPageWrapper>
  );
}
