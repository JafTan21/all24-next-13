"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import { Status } from "../../../../libs/Status";
import { IBet } from "../../../../libs/Models/Bet";

export default function Statement() {
  const { data, SearchBar, paginator } = useSearch({ url: "/user/bet" });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Game</Td>
      <Td>Game Description</Td>
      <Td>Question</Td>
      <Td>Answer</Td>
      <Td>Rate</Td>
      <Td>Amount</Td>
      <Td>Return</Td>
      <Td>Date</Td>
      <Td>
        <div style={{ minWidth: 160 }}>Status</div>
      </Td>
    </tr>
  );

  const make = (bet: IBet) => {
    return (
      <tr className="hover:bg-gray-100">
        <Td className="w-4 p-4">{bet.id}</Td>
        <Td>{bet.game}</Td>
        <Td>{bet.short_description}</Td>
        <Td>{bet.question}</Td>
        <Td>{bet.answer}</Td>
        <Td>{Number(bet.rate).toFixed(2)}</Td>
        <Td>{bet.amount}</Td>
        <Td>{Number(bet.amount) * Number(bet.rate)}</Td>
        <Td>{bet.date}</Td>
        <Td>
          <>
            <span
              className={
                bet.status == Status.Approved
                  ? "text-green-500"
                  : bet.status == Status.Rejected
                  ? "text-red-500"
                  : "text-blue-400"
              }
            >
              {bet.status_text}

              {bet.status == Status.Cashout && (
                <span className="mx-1">
                  ({bet.cashout_rate} rate) (
                  {bet.amount * (bet.cashout_rate || 1)})
                </span>
              )}

              {bet.status == Status.Refund && (
                <span className="mx-1">({bet.refund_rate} rate)</span>
              )}
            </span>

            {bet.status == Status.Pending && bet.possible_cash_out_rate ? (
              <form onSubmit={() => {}}>
                <div className="text-xs">
                  <div>
                    Rate: <b>{bet.possible_cash_out_rate}</b>
                  </div>
                  <div>
                    Return:{" "}
                    <b>{(bet.possible_cash_out_rate || 0) * bet.amount}</b>
                  </div>
                </div>
              </form>
            ) : (
              ""
            )}
          </>
        </Td>
      </tr>
    );
  };

  return (
    <ToastWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">Bet Statement</p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any) => make(bet))}
      </Table>
    </ToastWrapper>
  );
}
