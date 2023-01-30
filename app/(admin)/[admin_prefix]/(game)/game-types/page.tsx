"use client";

import axios from "axios";
import React from "react";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useGameTypes from "../../../../../hooks/api/admin/useGameTypes";
import useForm from "../../../../../hooks/useForm";
import { IRefresh } from "../../../../../libs/interfaces";
import { IGameType } from "../../../../../libs/Models/Game";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";
import { Add } from "./Add";
import { Edit } from "./Edit";

function TableHeader() {
  return (
    <tr>
      <th className="p-4">#</th>
      <td>game name</td>
      <td>image</td>
      <td>actions</td>
    </tr>
  );
}

export default function DefaultQuestions() {
  const { gameTypes, refresh } = useGameTypes();

  return (
    <AdminPageWrapper>
      <Add refresh={refresh} />
      <AdminTable header={<TableHeader />} title="Game Types">
        {gameTypes &&
          gameTypes?.map((row) => (
            <Maker row={row} refresh={refresh} key={row.id} />
          ))}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row, refresh }: { row: IGameType } & IRefresh) => {
  const { submitWithoutForm, isSubmitting } = useForm({
    initialState: null,
    resetOnResolve: true,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("/admin/game-types/" + row.id)
          .then((res) => {
            adminSuccessNotification(res.data.message);
            refresh();
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <tr className="hover:bg-gray-100">
      <Td className="w-4 p-4">{row.id}</Td>
      <td>{row.name}</td>
      <td className="flex items-center justify-center flex-col p-2">
        <img src={row.img} className="h-[40px] w-[40px]" />

        <span className="text-gray-500">({row.img})</span>
      </td>
      <td className="">
        <div className="flex-center-center">
          <Edit type={row} refresh={refresh} />
          <SubmitButton
            isSubmitting={isSubmitting}
            classNames="bg-red-500 text-white flex-center-center p-2 m-2 rounded shadow"
            text={"Delete"}
            onClick={submitWithoutForm}
          />
        </div>
      </td>
    </tr>
  );
};
