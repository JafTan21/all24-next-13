import axios from "axios";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import useUser from "../../../hooks/api/useUser";
import ErrorHandler from "../../../utils/helpers/ErrorHandler";
import {
  errorNotification,
  successNotification,
} from "../../../utils/helpers/NotificationHelper";
import { SpinnerContext } from "./SpinnerContext";

export const TicketForm = React.memo(() => {
  const [selected, selectedSet] = useState<{
    name: string;
    rate: number;
  }>({ name: "1", rate: 10 });

  const [amount, amountSet] = useState(100);
  const [buying, buyingSet] = useState(false);

  const { user } = useUser();

  const [show, showSet] = useState(false);

  const submit = (e: any) => {
    e.preventDefault();
    if (buying) return;
    buyingSet(true);

    if (!selected.name) {
      buyingSet(false);
      errorNotification("Please select a ticket");
      return;
    }

    axios
      .post("/user/SpinnerTicket", {
        amount,
        rate: selected.rate,
        name: selected.name,
      })
      .then((res) => {
        successNotification(res.data.message);
        selectedSet({ name: "", rate: 0 });
      })
      .catch(ErrorHandler)
      .then(() => buyingSet(false));
  };

  const { disabled } = useContext(SpinnerContext);

  return (
    <div
      style={{
        padding: "0 10px",
      }}
    >
      <div
        onClick={(e) => {
          showSet(false);
        }}
      >
        {[
          [
            { name: "1", rate: 10 },
            { name: "2", rate: 10 },
            { name: "3", rate: 10 },
            { name: "4", rate: 10 },
            { name: "5", rate: 10 },
          ],
          [
            { name: "6", rate: 10 },
            { name: "7", rate: 10 },
            { name: "8", rate: 10 },
            { name: "9", rate: 10 },
            { name: "10", rate: 10 },
          ],
          [
            { name: "11", rate: 10 },
            { name: "12", rate: 10 },
            { name: "13", rate: 10 },
            { name: "14", rate: 10 },
            { name: "15", rate: 10 },
          ],
        ].map((group, idx) => {
          return (
            <div
              key={idx}
              className={"flex flex-wrap justify-center items-center "}
            >
              {group.map((button) => (
                <TicketButton
                  row={idx}
                  key={button.name}
                  name={button.name}
                  rate={button.rate}
                  selected={selected}
                  selectedSet={selectedSet}
                  show={show}
                  showSet={showSet}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        <TicketButton
          show={show}
          name="1-5"
          rate={2}
          selected={selected}
          selectedSet={selectedSet}
          showSet={showSet}
        />
        <TicketButton
          show={show}
          name="6-10"
          rate={2}
          selected={selected}
          selectedSet={selectedSet}
          showSet={showSet}
        />
        <TicketButton
          show={show}
          name="11-15"
          rate={2}
          selected={selected}
          selectedSet={selectedSet}
          showSet={showSet}
        />
      </div>
      <form onSubmit={submit} className="flex flex-col">
        <div
          className="flex flex-row flex-wrap items-center justify-center h-10 mt-5"
          style={{ zIndex: 2 }}
        >
          <input
            disabled={disabled}
            value={amount}
            onChange={(e) => amountSet(parseInt(e.target.value))}
            placeholder="Amount"
            type="number"
            className="h-full px-2 py-1 text-gray-800 rounded bg-gray-50"
            style={{
              maxWidth: "220px",
              zIndex: 2,
            }}
          />
          <button
            disabled={disabled}
            type="submit"
            className="h-full px-3 py-2 text-white bg-blue-500 "
            style={{
              maxWidth: "50px",
              zIndex: 2,
            }}
          >
            {buying ? (
              <>
                <TailSpin height="30" color="white" ariaLabel="loading" />
              </>
            ) : (
              "Buy"
            )}
          </button>
        </div>

        <div
          style={{
            zIndex: 2,
          }}
          className="py-1 m-3 text-center text-gray-100 bg-gray-900"
        >
          <span
            style={{
              zIndex: 2,
            }}
          >
            Possible return:
          </span>
          <b
            style={{
              zIndex: 2,
            }}
          >
            {(amount || 0) * selected.rate}$
          </b>
        </div>
      </form>
    </div>
  );
});

interface ITicketButton {
  name: string;
  rate: number;
  selected: {
    name: string;
    rate: number;
  };
  selectedSet: (x: { name: string; rate: number }) => void;
  show: boolean;
  showSet: (x: boolean) => void;
  row?: number;
}

const TicketButton = React.memo(
  ({
    name,
    rate,
    selected,
    selectedSet,
    show,
    showSet,
    row,
  }: ITicketButton) => {
    const { disabled } = useContext(SpinnerContext);

    const getBg = (name: string): string => {
      if (name == "1") return "#fed237";
      if (name == "2") return "#8cc63f";
      if (name == "3") return "#debd53";
      if (name == "4") return "#25aae1";
      if (name == "5") return "#007cc1";
      if (name == "6") return "#144e97";
      if (name == "7") return "#873977";
      if (name == "8") return "#833a7a";
      if (name == "9") return "#7a3572";
      if (name == "10") return "#b02f18";
      if (name == "11") return "#f15f25";
      if (name == "12") return "#f9a02e";
      if (name == "13") return "#3d863a";
      if (name == "14") return "#1b3f87";
      if (name == "15") return "#1b3f87";
      if (name == "1-5") return "red";
      if (name == "6-10") return "green";
      if (name == "11-15") return "blue";

      return "";
    };

    return (
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          width: ["1-5", "6-10", "11-15"].includes(name) ? "33%" : "20%",
        }}
      >
        <button
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            // showSet(true);
            selectedSet({ name, rate });
          }}
          style={{
            minWidth: "90%",
            background: getBg(name),
          }}
          className={` ${
            !disabled && selected.name == name
              ? "bg-yellow-300"
              : "bg-red-600 text-gray-100"
          } 
            px-2 md:px-4 py-2 m-1 transition  rounded-md hover:bg-yellow-300 hover:text-gray-800`}
        >
          {name} <sup>{selected.name == name ? selected.rate : rate}</sup>
        </button>
      </div>
    );
  }
);
