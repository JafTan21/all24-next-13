"use client";

import React from "react";
import { BiMoney } from "react-icons/bi";
import Loading from "../../../components/Html/Loading";
import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useSuperClubDashboard from "../../../hooks/api/club/useSuperClubDashboard";
import { DashboardElement } from "../dashboard/DashboardElement";

export default function ClubDashboard() {
  const { data, isLoading } = useSuperClubDashboard();

  if (isLoading) return <Loading />;

  return (
    <ClubPageWrapper>
      <div className="p-4 w-full">
        <div className="grid grid-cols-12 gap-4">
          <DashboardElement
            icon={<BiMoney />}
            text="Today Commission"
            value={data.today_super_commission}
          />
          <DashboardElement
            icon={<BiMoney />}
            text="Monthly Commission"
            value={data.monthly_super_commission}
          />
          <DashboardElement
            icon={<BiMoney />}
            text="Total Commission"
            value={data.total_super_commission}
          />
        </div>
      </div>
    </ClubPageWrapper>
  );
}

export const revalidate = 0;
