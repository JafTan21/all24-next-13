import axios from "axios";
import React, { useState } from "react";
import { Rings } from "react-loader-spinner";
import ErrorHandler from "../../utils/helpers/ErrorHandler";

export default function LiveBalance() {
  const [balance, balanceSet] = useState<string | number>("balance");

  const [loading, loadingSet] = useState(false);

  const get_balance = () => {
    loadingSet(true);

    axios
      .get("/user/get-balance")
      .then((res) => {
        balanceSet(res.data.balance);

        setTimeout(() => {
          balanceSet("balance");
        }, 3000);
      })
      .catch(ErrorHandler)
      .finally(() => loadingSet(false));
  };

  return (
    <button
      disabled={balance !== "balance"}
      onClick={get_balance}
      style={{
        minWidth: "50px",
      }}
      className="px-3 py-1.5 bg-green-600 flex justify-center items-center rounded-3xl text-sm text-gray-100"
    >
      {loading ? (
        <Rings
          height={20}
          width={20}
          color={"white"}
          ariaLabel="loading-indicator"
        />
      ) : (
        <div className="">৳{balance}</div>
      )}
    </button>
  );
}
