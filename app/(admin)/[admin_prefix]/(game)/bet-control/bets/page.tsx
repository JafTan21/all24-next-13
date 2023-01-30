"use client";

import React, { useContext } from "react";
import queryString from "query-string";
import useSearch from "../../../../../../hooks/useSearch";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import { AdminTable } from "../../../../../../components/Html/Table";
import { IBet } from "../../../../../../libs/Models/Bet";
import Td from "../../../../../../components/Html/Td";
import StatusText from "../../../../../../components/Html/StatusText";
import useForm from "../../../../../../hooks/useForm";
import { AdminInput } from "../../../../../../components/Html/Input";
import SubmitButton from "../../../../../../components/Html/SubmitButton";
import axios from "axios";
import { IRefresh } from "../../../../../../libs/interfaces";
import {
  SelectableContext,
  useSelactableContext,
} from "../../../../../../utils/Contexts/SelectableContext";
import SelectInput from "../../../../../../components/Html/SelectInput";
import { Status } from "../../../../../../libs/Status";

export default function Bets() {
  const { answer_id, pending } = queryString.parse(location.search);

  const { data, refresh } = useSearch<IBet[]>({
    url: "/admin/answer/" + answer_id + "/bets",
    noPagination: true,
    params: {
      pending: typeof pending == "string" && pending == "true" ? true : false,
    },
  });

  const values = useSelactableContext();

  return (
    <AdminPageWrapper>
      <SelectableContext.Provider value={values}>
        <AdminTable
          header={
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (!data) return;

                    let _checked: {
                      [id: number]: boolean;
                    } = {};
                    let s = !Object.values(values.selected)[0];
                    data.forEach((d) => {
                      if (d.status == Status.Pending) _checked[d.id] = s;
                    });
                    values.selectedSet(_checked);
                  }}
                  checked={
                    data &&
                    data.filter((d) => d.status == Status.Pending).length ==
                      Object.values(values.selected).filter((c) => c).length
                  }
                />
                #
              </th>
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
          }
          title="Bets"
          beforeSearchBar={
            <>
              <ChangeRate refresh={refresh} />
              <RefundSelected refresh={refresh} />
            </>
          }
        >
          {data && data.map((row) => <Maker initialRow={row} key={row.id} />)}
        </AdminTable>
      </SelectableContext.Provider>
    </AdminPageWrapper>
  );
}

const Maker = ({ initialRow: row }: { initialRow: IBet }) => {
  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">
        <SelectInput id={row.id} status={row.status} />
        {row.id}
      </Td>
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

const ChangeRate = ({ refresh }: IRefresh) => {
  const { selected, selectedSet } = useContext(SelectableContext);

  const { onSubmit, state, onChange, isSubmitting } = useForm({
    initialState: {
      rate: undefined,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/bets/change-rate", {
            rate: state.rate,
            checked: selected,
          })
          .then((res) => {
            selectedSet({});
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <form onSubmit={onSubmit} className="w-full flex-center-center">
      <div className="w-2/3">
        <AdminInput
          required={true}
          label="New rate:"
          name="rate"
          type="number"
          value={state.rate}
          onChange={onChange}
        />
      </div>
      <SubmitButton
        isSubmitting={isSubmitting}
        text="Change"
        classNames="flex justify-center items-center w-1/3 min-w-[80px] h-10 mt-6 font-bold transition duration-300 bg-green-600 rounded text-indigo-50 hover:bg-green-500"
      />
    </form>
  );
};

const RefundSelected = ({ refresh }: IRefresh) => {
  const { selected, selectedSet } = useContext(SelectableContext);
  const { onSubmit, state, onChange, isSubmitting } = useForm({
    initialState: {
      rate: undefined,
    },
    resetOnResolve: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/bet/refund", {
            rate: state.rate,
            checked: selected,
          })
          .then((res) => {
            selectedSet({});
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <form onSubmit={onSubmit} className="w-full flex-center-center">
      <div className="w-2/3">
        <AdminInput
          required={true}
          label="Refund Percentage"
          name="rate"
          type="number"
          value={state.rate}
          onChange={onChange}
        />
      </div>
      <SubmitButton
        isSubmitting={isSubmitting}
        text="Refund"
        classNames="flex justify-center items-center w-1/3 min-w-[80px] h-10 mt-6 font-bold transition duration-300 bg-green-600 rounded text-indigo-50 hover:bg-green-500"
      />
    </form>
  );
};
