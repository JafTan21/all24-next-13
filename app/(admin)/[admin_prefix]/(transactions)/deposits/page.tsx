"use client";

import axios from "axios";
import React from "react";
import ActionButtons from "../../../../../components/Html/ActionButtons";
import { Submitting } from "../../../../../components/Html/Loading";
import SelectedActions from "../../../../../components/Html/SelectedActions";
import SelectInput from "../../../../../components/Html/SelectInput";
import StatusText from "../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import { LoginToUserButton } from "../../../../../hooks/api/useUser";
import useForm from "../../../../../hooks/useForm";
import useSearch from "../../../../../hooks/useSearch";
import { IDeposit } from "../../../../../libs/Models/Deposit";
import { Status } from "../../../../../libs/Status";
import {
  SelectableContext,
  useSelactableContext,
} from "../../../../../utils/Contexts/SelectableContext";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";
import TableHeader from "./Header";

export default function Deposits() {
  const { SearchBar, data, paginator, refresh } = useSearch<IDeposit[]>({
    url: "/admin/deposit",
  });

  const values = useSelactableContext();

  return (
    <AdminPageWrapper>
      <SelectableContext.Provider value={values}>
        <AdminTable
          paginator={paginator}
          header={<TableHeader />}
          title="Manage User Deposits"
          beforeSearchBar={
            <div>
              {data && (
                <SelectedActions
                  data={data}
                  type="deposit"
                  postEndpoint="/admin/deposit/selected-action"
                  refresh={refresh}
                />
              )}
            </div>
          }
          searchBar={SearchBar}
        >
          {data &&
            data.map((row: any) => (
              <Maker {...{ row, refresh }} key={row.id} />
            ))}
        </AdminTable>
      </SelectableContext.Provider>
    </AdminPageWrapper>
  );
}

const Maker = ({ row, refresh }: { row: IDeposit; refresh: () => void }) => {
  const { isSubmitting, update, state } = useForm({
    initialState: {
      status: row.status,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/deposit/" + row.id, state)
          .then((res) => {
            refresh();
            adminSuccessNotification(res.data.message);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">
        <SelectInput id={row.id} status={row.status} />
        {row.id}
      </Td>
      <Td>{row.username}</Td>
      <Td>{Number(row.amount).toFixed(2)}$</Td>
      <Td>{row.from}</Td>
      <Td>{row.to}</Td>
      <Td>{row.method}</Td>
      <Td>{row.transaction_number}</Td>
      <Td>{row.date}</Td>
      <Td>
        <StatusText status={row.status} />
      </Td>
      <Td>
        {isSubmitting && <Submitting />}
        {!isSubmitting && state.status == Status.Pending && (
          <ActionButtons update={update} />
        )}

        <LoginToUserButton user_id={row.user_id} />
      </Td>
    </tr>
  );
};
