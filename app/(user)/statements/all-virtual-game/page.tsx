"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import FormatDate, {
  DateFormatShow,
} from "../../../../utils/helpers/DateHelper";
import { IOptionGame } from "../../../../libs/Models/OptionGame";
import StatusText from "../../../../components/Html/StatusText";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch<IOptionGame[]>({
    url: `/user/option-game`,
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Selected </Td>
      <Td>Winning </Td>
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
        Vitrual Games Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((row) => <Maker row={row} key={row.id} />)}
      </Table>
    </UserPageWrapper>
  );
}

const Maker = ({ row }: { row: IOptionGame }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.selected_option}</Td>
      <Td>{row.winning_option}</Td>
      <Td>{row.amount}</Td>
      <Td>{row.rate}</Td>
      <Td>{row.possible_return}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>{FormatDate(row.created_at, DateFormatShow)}</Td>
    </tr>
  );
};
