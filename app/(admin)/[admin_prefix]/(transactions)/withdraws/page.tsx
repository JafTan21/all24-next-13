"use client";

import axios from "axios";
import React, { useContext } from "react";
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
import { IWithdraw } from "../../../../../libs/Models/Withdraw";
import { Status } from "../../../../../libs/Status";
import {
  SelectableContext,
  useSelactableContext,
} from "../../../../../utils/Contexts/SelectableContext";
import TableHeader from "./Header";

export default function Withdraws() {
  const { SearchBar, data, paginator, refresh } = useSearch<IWithdraw[]>({
    url: "/admin/withdraw",
  });

  const values = useSelactableContext();

  return (
    <AdminPageWrapper>
      <SelectableContext.Provider value={values}>
        <AdminTable
          paginator={paginator}
          header={<TableHeader />}
          title="Manage User Withdraws"
          beforeSearchBar={
            <div>
              {data && (
                <SelectedActions
                  data={data}
                  type="withdraw"
                  postEndpoint="/admin/withdraw/selected-action"
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

const Maker = ({ row, refresh }: { row: IWithdraw; refresh: () => void }) => {
  const { isSubmitting, update, state } = useForm({
    initialState: {
      status: row.status,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .put("/admin/withdraw/" + row.id, state)
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
      <Td className="w-4 p-4">
        <SelectInput id={row.id} status={row.status} />
        {row.id}
      </Td>
      <Td>{row.username}</Td>
      <Td>{row.to}</Td>
      <Td>{row.method}</Td>
      <Td>{Number(row.amount).toFixed(2)}$</Td>
      <Td>{row.date}</Td>{" "}
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
