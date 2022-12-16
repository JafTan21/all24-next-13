"use client";

import axios from "axios";
import React, { ReactElement } from "react";
import { BiDollar, BiMoney } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";

interface IClubDashboard {
  total_members: number;
  total_users_balance: number;

  club_balance: number;

  today_commission: number;
  monthly_commission: number;

  today_user_credit: number;
  monthly_user_credit: number;

  today_user_deposit: number;
  monthly_user_desposit: number;

  today_user_withdraw: number;
  monthly_user_withdraw: number;

  today_user_profit: number;
  monthly_user_profit: number;
}

export default function ClubDashboard() {
  // const data: IClubDashboard = await getDashboardData();
  const state = {
    total_members: 0,
    total_users_balance: 0,
    club_balance: 0,

    today_commission: 0,
    monthly_commission: 0,

    today_user_credit: 0,
    monthly_user_credit: 0,

    today_user_deposit: 0,
    monthly_user_desposit: 0,

    today_user_withdraw: 0,
    monthly_user_withdraw: 0,

    today_user_profit: 0,
    monthly_user_profit: 0,
  };

  return (
    <ClubPageWrapper>
      <div className="p-4 w-full">
        <div className="grid grid-cols-12 gap-4">
          <DashboardElement
            icon={<FaUser />}
            text="Total User"
            value={state.total_members}
          />
          <DashboardElement
            icon={<BiMoney />}
            text="User Balance"
            value={state.total_users_balance}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Club Balance"
            value={state.club_balance}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Commission"
            value={state.today_commission}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Commission"
            value={state.monthly_commission}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Credit"
            value={state.today_user_credit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Credit"
            value={state.monthly_user_credit}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Deposit"
            value={state.today_user_deposit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Deposit"
            value={state.monthly_user_desposit}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Withdraw"
            value={state.today_user_withdraw}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Withdraw"
            value={state.monthly_user_withdraw}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today User Profit"
            value={state.today_user_profit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly User Profit"
            value={state.monthly_user_profit}
          />
        </div>
      </div>
    </ClubPageWrapper>
  );
}

const DashboardElement = (props: {
  icon: ReactElement;
  text: string;
  value: string | number;
}) => {
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-3">
        <div className="flex flex-row bg-white shadow-sm rounded p-4">
          <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
            {props.icon}
          </div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="text-sm text-gray-500">{props.text}</div>
            <div className="font-bold text-lg">{props.value}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const revalidate = 0;
