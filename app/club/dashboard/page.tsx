"use client";

import axios from "axios";
import React from "react";
import { BiDollar, BiMoney } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Loading from "../../../components/Html/Loading";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useClubDashboard from "../../../hooks/api/club/useClubDashboard";
import { DashboardElement } from "./DashboardElement";

export default function ClubDashboard() {
  const { data, isLoading } = useClubDashboard();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ClubPageWrapper>
      <div className="p-4 w-full">
        <div className="grid grid-cols-12 gap-4">
          <DashboardElement
            icon={<FaUser />}
            text="Total User"
            value={data.total_members}
          />
          <DashboardElement
            icon={<BiMoney />}
            text="User Balance"
            value={data.total_users_balance}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Club Balance"
            value={data.club_balance}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Commission"
            value={data.today_commission}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Commission"
            value={data.monthly_commission}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Credit"
            value={data.today_user_credit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Credit"
            value={data.monthly_user_credit}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Deposit"
            value={data.today_user_deposit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Deposit"
            value={data.monthly_user_desposit}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today Withdraw"
            value={data.today_user_withdraw}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly Withdraw"
            value={data.monthly_user_withdraw}
          />

          <DashboardElement
            icon={<BiDollar />}
            text="Today User Profit"
            value={data.today_user_profit}
          />
          <DashboardElement
            icon={<BiDollar />}
            text="Monthly User Profit"
            value={data.monthly_user_profit}
          />
        </div>
      </div>
    </ClubPageWrapper>
  );
}

export const revalidate = 0;
