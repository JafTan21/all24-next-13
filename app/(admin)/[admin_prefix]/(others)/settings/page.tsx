"use client";

import axios from "axios";
import React from "react";
import Input from "../../../../../components/Html/Input";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import { AdminTable } from "../../../../../components/Html/Table";
import Td from "../../../../../components/Html/Td";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useForm from "../../../../../hooks/useForm";
import useSearch from "../../../../../hooks/useSearch";
import { ISetting } from "../../../../../libs/Models/Setting";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";

export default function page() {
  const { data } = useSearch<ISetting[]>({
    url: "/admin/setting",
    noPagination: true,
  });

  const header = (
    <tr>
      <th className="p-4">#</th>
      <Td>Setting Name</Td>
      <Td>Min</Td>
      <Td>Max</Td>
      <Td>Rate</Td>
      <Td>Interval</Td>
      <Td>On/Off</Td>
      <Td>save</Td>
    </tr>
  );

  return (
    <AdminPageWrapper>
      <AdminTable header={header} title="Manage Settings">
        {data && data.map((row) => <Maker row={row} key={row.key} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}

const Maker = ({ row }: { row: ISetting }) => {
  const { state, onChange, submitWithoutForm, isSubmitting, updateState } =
    useForm({
      initialState: row,
      submit: (state) => {
        return new Promise((resolve, reject) => {
          axios
            .put("/admin/setting/" + state.id, state)
            .then((res) => {
              adminSuccessNotification(res.data.message);
              resolve(res.data);
            })
            .catch(reject);
        });
      },
    });

  return (
    <tr className="hover:bg-gray-100 ">
      <Td className="w-4 p-4">{row.id}</Td>
      <Td>{row.key}</Td>
      <Td className="w-[100px]">
        <Input
          required={true}
          type="number"
          value={state.min}
          name="min"
          onChange={onChange}
        />
      </Td>
      <Td className="w-[100px]">
        <Input
          required={true}
          type="number"
          value={state.max}
          name="max"
          onChange={onChange}
        />
      </Td>
      <Td className="w-[100px]">
        <Input
          required={true}
          type="number"
          value={state.rate}
          name="rate"
          onChange={onChange}
        />
      </Td>
      <Td className="w-[100px]">
        <Input
          required={true}
          type="number"
          value={state.interval}
          name="interval"
          onChange={onChange}
        />
      </Td>
      <Td>
        <ToggleButton
          on="On"
          off="Off"
          isActive={state.feature_on}
          onClick={(e) => {
            updateState({
              feature_on: !state.feature_on,
            });
          }}
          withDiv={true}
          classNames="p-2"
        />
      </Td>
      <Td>
        <SubmitButton
          isSubmitting={isSubmitting}
          text="Save"
          onClick={submitWithoutForm}
          classNames="flex justify-center items-center w-full min-w-[80px] h-10 font-bold transition duration-300 bg-green-600 rounded-2xl text-indigo-50 hover:bg-green-500"
        />
      </Td>
    </tr>
  );
};
