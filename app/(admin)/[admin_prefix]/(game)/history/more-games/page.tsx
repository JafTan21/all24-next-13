"use client";

import React, { useEffect, useState } from "react";
import { OptionGames } from "../../../../../(user)/more-games/OptionGames";
import { AdminSelect } from "../../../../../../components/Html/Input";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IOptionGame } from "../../../../../../libs/Models/OptionGame";
import FormatDate, {
  DateFormatShow,
} from "../../../../../../utils/helpers/DateHelper";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <Td>Username</Td>
      <Td>Selected </Td>
      <Td>Winning </Td>
      <Td>Amount</Td>
      <Td>Rate</Td>
      <Td>Possible Return</Td>
      <Td>Status</Td>
      <Td>Date</Td>
    </tr>
  );
}

export default function Statement() {
  const [gameName, gameNameSet] = useState(() => {
    return Object.entries(OptionGames)[0][1]["name"];
  });

  const { SearchBar, data, paginator, refresh } = useSearch<IOptionGame[]>({
    url: "/admin/option-game",
    params: {
      game_name: gameName,
    },
  });

  useEffect(refresh, [gameName]);

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title={`More Games History of: ${gameName}`}
        searchBar={SearchBar}
        beforeSearchBar={
          <AdminSelect
            value={gameName}
            name="gameName"
            label="Game Name"
            onChange={(e) => gameNameSet(e.target.value)}
            required={true}
          >
            <>
              {Object.entries(OptionGames).map(([game, info]) => {
                return (
                  <option value={info.name} key={game}>
                    {info.name}
                  </option>
                );
              })}
            </>
          </AdminSelect>
        }
      >
        {data && data.map((row: any) => <Maker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: IOptionGame }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.user.username}</Td>
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
