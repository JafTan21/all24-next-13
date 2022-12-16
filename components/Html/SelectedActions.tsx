import axios from "axios";
import React, { useContext } from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import useForm from "../../hooks/useForm";
import { Status } from "../../libs/Status";
import { SelectableContext } from "../../utils/Contexts/SelectableContext";
import { adminSuccessNotification } from "../../utils/helpers/NotificationHelper";
import { Submitting } from "./Loading";

interface Props {
  data: any[];
  postEndpoint: string;
  refresh: () => void;
  type: "deposit" | "withdraw" | "club-withdraw" | "balance-transfer";
}

export default function SelectedActions({
  data,
  postEndpoint,
  refresh,
  type,
}: Props) {
  const { selected, selectedSet } = useContext(SelectableContext);

  const { isSubmitting, submitWithState, state } = useForm({
    initialState: {
      status: Status.Approved,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post(postEndpoint, {
            status: state.status,
            ids: selected,
          })
          .then((res) => {
            adminSuccessNotification(res.data.message);
            refresh();
            selectedSet({});
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  return (
    <div className="flex items-center pt-2">
      <div>
        <input
          type="checkbox"
          onChange={(e) => {
            let _checked: {
              [id: number]: boolean;
            } = {};
            let s = !Object.values(selected)[0];
            data.forEach((d) => {
              if (d.status == Status.Pending) _checked[d.id] = s;
            });
            selectedSet(_checked);
          }}
          checked={
            data.filter((d) => d.status == Status.Pending).length ==
            Object.values(selected).filter((c) => c).length
          }
        />
        Toggle all
      </div>

      <div className="ml-3">
        {isSubmitting ? (
          <Submitting />
        ) : (
          <>
            <button
              onClick={() => {
                submitWithState({ status: Status.Approved });
              }}
              title="approve"
              className="bg-green-600 text-white p-2 rounded"
            >
              <TiTick fontSize={18} />
            </button>

            <button
              onClick={() => {
                submitWithState({ status: Status.Rejected });
              }}
              title="reject"
              className="ml-2 bg-red-600 text-white p-2 rounded"
            >
              <ImCross fontSize={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
