"use client";

import React from "react";
import Collapsible from "../../../../components/Html/Collapsible";
import { AdminTable } from "../../../../components/Html/Table";
import Td from "../../../../components/Html/Td";
import AdminPageWrapper from "../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../hooks/useSearch";
import FormaTdate, {
  DateFormatShow,
} from "../../../../utils/helpers/DateHelper";

interface IDailyProfit {
  amount_in: number;
  amount_out: number;

  total_refund: number;
  total_sponsor: number;
  total_club_commission: number;
  total_balance_transfer: number;
  today_profit: number;
  today_club: number;
  today_user: number;
  today_game: number;
  today_admin: number;
  today_bets_count: number;
  today_bets_amount: number;
  today_multibets_count: number;
  today_multibets_amount: number;
  today_spinner_win: number;
  today_spinner_amount: number;
}

export default function DailyProfits() {
  const { data } = useSearch<{
    [date: string]: IDailyProfit;
  }>({
    url: "/admin/daily-profits",
    noPagination: true,
  });

  return (
    <AdminPageWrapper>
      {data &&
        Object.entries(data).map(([date, profit]) => {
          return (
            <Collapsible
              key={date}
              className={`mb-3`}
              time={100}
              isClosed={true}
              trigger={
                <div className="bg-blue-400 text-white m-1 rounded px-2 py-2">
                  <span> {date}:</span>
                  <span> {profit?.amount_in} -</span>
                  <span> {profit?.amount_out}</span>
                  <span> = {profit?.amount_in - profit?.amount_out}</span>
                </div>
              }
            >
              <div className="bg-white flex flex-col p-2 border-b border-black mb-3">
                <span>
                  Total Amount In: <b>{profit?.amount_in}</b>
                </span>
                <span>
                  Total Amount Out: <b>{profit?.amount_out}</b>
                </span>
                <span>
                  Total profit: <b>{profit?.amount_in - profit?.amount_out}</b>
                </span>
                <span>
                  Total refund profit: <b>{profit?.total_refund}</b>
                </span>
                <span>
                  Total sponsor commision: <b>{profit?.total_sponsor}</b>
                </span>
                <span>
                  Total club commision: <b>{profit?.total_club_commission}</b>
                </span>
                <span>
                  Total balance transfer:{" "}
                  <b>{profit?.total_balance_transfer}</b>
                </span>
                <span>
                  Today profit: <b>{profit?.today_profit}</b>
                </span>
                <span>
                  Today club: <b>{profit?.today_club}</b>
                </span>
                <span>
                  Today user: <b>{profit?.today_user}</b>
                </span>
                <span>
                  Today game: <b>{profit?.today_game}</b>
                </span>
                <span>
                  Today admin: <b>{profit?.today_admin}</b>
                </span>
                <span>
                  Today bets count: <b>{profit?.today_bets_count}</b>
                </span>
                <span>
                  Today bets amount: <b>{profit?.today_bets_amount}</b>
                </span>
                <span>
                  Today multibets count: <b>{profit?.today_multibets_count}</b>
                </span>
                <span>
                  Today multibets amount:
                  <b>{profit?.today_multibets_amount}</b>
                </span>
                <span>
                  Today spinner amount: <b>{profit?.today_spinner_amount}</b>
                </span>
                <span>
                  Today spinner win: <b>{profit?.today_spinner_win}</b>
                </span>
                <span>
                  Today spinner profit:
                  <b>
                    {profit?.today_spinner_amount - profit?.today_spinner_win}
                  </b>
                </span>
              </div>
            </Collapsible>
          );
        })}
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: any }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="p-4">{row.id}</Td>
      <Td>{row.from}</Td>
      <Td>{row.amount_in}</Td>
      <Td>{row.amount_out}</Td>
      <Td>{row.total}</Td>
      <Td>{row.description}</Td>
      <Td>{FormaTdate(row.created_at, DateFormatShow)}</Td>
    </tr>
  );
};
