"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import { IMultibet } from "../../../../libs/Models/Multibet";
import { getStatusText, Status } from "../../../../libs/Status";
import StatusText from "../../../../components/Html/StatusText";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({ url: "/user/multibet" });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Games</Td>
      <Td>Rate</Td>
      <Td>Amount</Td>
      <Td>Return</Td>
      <Td>Date</Td>
      <Td>Status</Td>
    </tr>
  );

  const make = (multibet: IMultibet) => {
    return (
      <tr key={multibet.id} className="hover:bg-gray-100">
        <td className="w-4 p-4">{multibet.id}</td>
        <Td>
          <ul className="">
            {multibet.multibet_games.map((multibetGame, idx) => {
              return (
                <li key={idx} className="my-1.5">
                  <b>{idx + 1}. </b>
                  {multibetGame.game.team1}
                  <span className="text-yellow-400"> vs </span>
                  {multibetGame.game.team2}(
                  {multibetGame.game.short_description})
                  <br />
                  {multibetGame.question.question} <br />
                  {multibetGame.answer.answer}
                  <span
                    style={{
                      background: "blue",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      fontSize: ".8rem",
                      marginLeft: "5px",
                    }}
                    className="text-white"
                  >
                    {Number(multibetGame.answer_rate).toFixed(2)}
                  </span>
                  ({getStatusText(multibetGame.answer.status)})
                </li>
              );
            })}
          </ul>
        </Td>
        <Td>{Number(multibet.rate).toFixed(2)}</Td>
        <Td>{multibet.amount}</Td>
        <Td>{multibet.amount * multibet.rate}</Td>
        <Td>{multibet.date}</Td>
        <Td>
          <StatusText status={multibet.status} />
        </Td>
      </tr>
    );
  };

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">
        Multibet Statement
      </p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((row: any) => make(row))}
      </Table>
    </UserPageWrapper>
  );
}
