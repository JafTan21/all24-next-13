import axios from "axios";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import SubmitButton from "../../../../components/Html/SubmitButton";
import { AdminTable } from "../../../../components/Html/Table";
import Td from "../../../../components/Html/Td";
import useForm from "../../../../hooks/useForm";
import useSearch from "../../../../hooks/useSearch";
import { IRefresh } from "../../../../libs/interfaces";
import { IPaymentMethod } from "../../../../libs/Models/PaymentMethod";
import AddPayment from "./AddPayment";
import EditPayment from "./EditPayment";

export default function PaymentMethods() {
  const { data, refresh } = useSearch<{ methods: IPaymentMethod[] }>({
    url: "/admin/TransactionMethod",
    noPagination: true,
  });

  return (
    <>
      <AddPayment refresh={refresh} />
      <AdminTable
        header={
          <tr>
            <th className="p-4">#</th>
            <Td>Name</Td>
            <Td>Number</Td>
            <Td className="min-w-[200px]">Image</Td>
            <Td>actions</Td>
            <Td>action</Td>
            <Td>Action by</Td>
          </tr>
        }
      >
        {data &&
          data.methods.map((row) => (
            <Maker row={row} key={row.id} refresh={refresh} />
          ))}
      </AdminTable>
    </>
  );
}

const Maker = ({ row, refresh }: { row: IPaymentMethod } & IRefresh) => {
  const { submitWithoutForm, isSubmitting } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .delete("/admin/TransactionMethod/" + row.id)
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
      <Td className="p-4">{row.id}</Td>
      <Td>{row.name}</Td>
      <Td>{row.number}</Td>
      <Td>
        <img src={row.image} alt="" style={{ height: 50 }} />
      </Td>
      <Td>
        <div className="flex">
          <EditPayment method={row} refresh={refresh} />
          <SubmitButton
            isSubmitting={isSubmitting}
            classNames="ml-2 bg-red-600 text-white p-2 rounded"
            text={<AiFillDelete />}
            onClick={submitWithoutForm}
          />
        </div>
      </Td>
      <Td>{row.action}</Td>
      <Td>{row.action_by_email}</Td>
    </tr>
  );
};
