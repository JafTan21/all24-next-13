import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import ErrorHandler from "../../utils/helpers/ErrorHandler";
import { hrefWithAdminPrefix } from "./SideLink";

export default function Notifications() {
  const [data, dataSet] = useState({
    deposit_count: 0,
    withdraw_count: 0,
    club_withdraw_count: 0,
    balance_transfer_count: 0,
  });
  const [showing, showingSet] = useState(false);

  useEffect(() => {
    axios
      .get("/admin/transaction-count")
      .then((res) => {
        dataSet({
          deposit_count: res.data.deposit_count,
          withdraw_count: res.data.withdraw_count,
          club_withdraw_count: res.data.club_withdraw_count,
          balance_transfer_count: res.data.balance_transfer_count,
        });
      })
      .catch(ErrorHandler);
  }, []);

  const closeNotifications = () => showingSet(false);
  const openNotifications = () => showingSet(true);

  const hrefs = {
    withdraws: hrefWithAdminPrefix("withdraws"),
    deposits: hrefWithAdminPrefix("deposits"),
    club_withdraws: hrefWithAdminPrefix("club-withdraws"),
    transfers: hrefWithAdminPrefix("to-reseller-balance-transfers"),
  };

  return (
    <div>
      <button
        onClick={(e) => showingSet((x) => !x)}
        className="bg-green-600 text-white flex p-2 mr-4 rounded"
      >
        <IoIosNotificationsOutline fontSize={22} />
        {Object.values(data).reduce((prev, curr) => prev + curr)}
      </button>

      {showing && (
        <>
          <div
            className="absolute h-screen w-screen top-0 left-0"
            onClick={closeNotifications}
          ></div>
          <div
            className="absolute right-0 shadow-lg"
            onClick={closeNotifications}
          >
            <Link
              href={hrefs.withdraws}
              className={`${
                data.withdraw_count > 0
                  ? "bg-gray-50 text-blue-500"
                  : "bg-gray-300 text-gray-500"
              } text-blue-500 p-2 mt-1 rounded flex`}
            >
              <IoIosNotificationsOutline size={20} /> {data.withdraw_count} new
              Withdraws
            </Link>

            <Link
              href={hrefs.deposits}
              className={`${
                data.deposit_count > 0
                  ? "bg-gray-50 text-blue-500"
                  : "bg-gray-300 text-gray-500"
              } text-blue-500 p-2 mt-1 rounded flex`}
            >
              <IoIosNotificationsOutline size={20} /> {data.deposit_count} new
              Deposits
            </Link>

            <Link
              href={hrefs.club_withdraws}
              className={`${
                data.club_withdraw_count > 0
                  ? "bg-gray-50 text-blue-500"
                  : "bg-gray-300 text-gray-500"
              } text-blue-500 p-2 mt-1 rounded flex`}
            >
              <IoIosNotificationsOutline size={20} /> {data.club_withdraw_count}
              new Club Withdraws
            </Link>

            <Link
              href={hrefs.transfers}
              className={`${
                data.balance_transfer_count > 0
                  ? "bg-gray-50 text-blue-500"
                  : "bg-gray-300 text-gray-500"
              }  p-2 mt-1 rounded flex`}
            >
              <IoIosNotificationsOutline size={20} />
              {data.balance_transfer_count} new Transfers
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
