"use client";

import React from "react";
import Td from "../../../../components/Html/Td";
import Table from "../../../../components/Html/Table";
import useSearch from "../../../../hooks/useSearch";
import { Status } from "../../../../libs/Status";
import { IBet } from "../../../../libs/Models/Bet";
import SubmitButton from "../../../../components/Html/SubmitButton";
import useForm from "../../../../hooks/useForm";
import axios from "axios";
import { successNotification } from "../../../../utils/helpers/NotificationHelper";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";
import { useSocketReciever } from "../../../../utils/helpers/SocketHelper";
// import { useSocketReciever } from "../../../../utils/helpers/SocketHelper";

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

  return (
    <UserPageWrapper>
      <p className="mt-5 text-2xl text-center text-gray-700">Bet Statement</p>
      {SearchBar}
      <Table paginator={paginator} header={header}>
        {data && data.map((bet: any, idx) => <Maker bet={bet} key={idx} />)}
      </Table>
    </UserPageWrapper>
  );
}

const Maker = ({ bet }: { bet: IBet }) => {
  const { onSubmit, state, isSubmitting, updateState } = useForm({
    initialState: bet,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        if (window.confirm("Are you sure?")) {
          axios
            .post("/user/bet/cashout/" + bet.id)
            .then((res) => {
              successNotification(res.data.message);
              updateState(res.data.bet);
              resolve(res.data);
            })
            .catch(reject);
        } else reject();
      });
    },
  });

  useSocketReciever(`edit-cashout-rate-of-${bet.answer_id}`, (data) => {
    console.log(data);
  });

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{bet.id}</Td>
      <Td>{state.game}</Td>
      <Td>{state.short_description}</Td>
      <Td>{state.question}</Td>
      <Td>{state.answer}</Td>
      <Td>{Number(state.rate).toFixed(2)}</Td>
      <Td>{state.amount}</Td>
      <Td>{state.possible_return}</Td>
      <Td>{state.date}</Td>
      <Td>
        <>
          <span
            className={
              state.status == Status.Approved
                ? "text-green-500"
                : state.status == Status.Rejected
                ? "text-red-500"
                : "text-blue-400"
            }
          >
            {state.status_text}

            {state.status == Status.Cashout && (
              <span className="mx-1">
                ({state.cashout_rate} rate) (
                {state.amount * (state.cashout_rate || 1)})
              </span>
            )}

            {state.status == Status.Refund && (
              <span className="mx-1">({state.refund_rate} rate)</span>
            )}
          </span>

          {state.status == Status.Pending && state.possible_cash_out_rate ? (
            <form onSubmit={onSubmit}>
              <SubmitButton
                isSubmitting={isSubmitting}
                text="Cashout"
                classNames="bg-red-500 px-3 py-2 rouned text-white"
              />
              <div className="text-xs">
                <div>
                  Rate: <b>{state.possible_cash_out_rate}</b>
                </div>
                <div>
                  Return:
                  <b>{(state.possible_cash_out_rate || 0) * state.amount}</b>
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
