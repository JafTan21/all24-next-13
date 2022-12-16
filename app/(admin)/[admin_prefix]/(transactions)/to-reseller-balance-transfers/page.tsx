"use client";

import axios from "axios";
import React, { ReactElement } from "react";
import ActionButtons from "../../../../../components/Html/ActionButtons";
import { Submitting } from "../../../../../components/Html/Loading";
import StatusText from "../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../hooks/useForm";
import useSearch from "../../../../../hooks/useSearch";
import { IBalanceTransfer } from "../../../../../libs/Models/BalanceTransfer";
import { Status } from "../../../../../libs/Status";
import FormatDate, {
  DateFormatShow,
} from "../../../../../utils/helpers/DateHelper";
import TableHeader from "./Header";

export default function Deposits() {
  const { SearchBar, data, paginator, refresh } = useSearch<IBalanceTransfer[]>(
    {
      url: "/admin/UserToResellerBalanceTransfer",
    }
  );

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<TableHeader />}
        title="Manage Balance Transfers"
        searchBar={SearchBar}
      >
        {data &&
          data.map((row: any) => <Maker {...{ row, refresh }} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({
  row,
  refresh,
}: {
  row: IBalanceTransfer;
  refresh: () => void;
}) => {
  const { isSubmitting, update, state } = useForm({
    initialState: {
      status: row.status,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/UserToResellerBalanceTransfer/" + row.id, state)
          .then((res) => {
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr className="hover:bg-gray-100">
      <td>{row.id}</td>
      <td>{row.from.username}</td>
      <td>{row.to.username}</td>
      <td>{row.amount}</td>
      <td>{FormatDate(row.created_at, DateFormatShow)}</td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>
        {isSubmitting && <Submitting />}
        {!isSubmitting && state.status == Status.Pending && (
          <ActionButtons update={update} />
        )}
      </Td>
    </tr>
  );
};
