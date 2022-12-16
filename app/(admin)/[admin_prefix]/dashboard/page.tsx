"use client";

import React, { ReactElement } from "react";
import AdminPageWrapper from "../../../../components/Wrappers/AdminPageWrapper";
import useAdminDashboard from "../../../../hooks/api/admin/useAdminDashboard";

import { BiDollar, BiMoney } from "react-icons/bi";
import { FaGamepad, FaUser } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import Loading from "../../../../components/Html/Loading";
import { OptionGames } from "../../../(user)/more-games/OptionGames";
import { GoToUser } from "./GoToUser";
import { GoToClub } from "./GoToClub";
import PaymentMethods from "./PaymentMethods";

const Title = (text: string) => {
  return (
    <p className="text-2xl text-center mt-5 bg-green-500 text-white p-1">
      {text}
    </p>
  );
};

export default function Dashboard() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading) return <Loading />;

  return (
    <AdminPageWrapper>
      <div className="bg-gray-300 p-2 m-2 rounded">
        {Title("Today")}
        <DashboardElement
          icon={<BiDollar />}
          text="Today Deposit"
          value={data.today_user_deposit}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today Withdraw"
          value={data.today_user_withdraw}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today Club Withdraw"
          value={data.today_club_withdraw}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today profit"
          value={data.today_profit}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today Spinner profit"
          value={data.today_spinner_profit}
        />

        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today bets amount"
          value={data.total_bets_amount}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today bets win"
          value={data.total_bets_win}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today bets count"
          value={data.total_bets_count}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today refund"
          value={data.today_refund}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today bet pending amount"
          value={data.today_bet_pending_amount}
        />

        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today multibets amount"
          value={data.total_multibets_amount}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today multibets win"
          value={data.total_multibets_win}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today multibets count"
          value={data.total_multibets_count}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today sponsor bonus"
          value={data.today_sponsor_bonus}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today club bonus"
          value={data.today_club_bonus}
        />

        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today Virtual sponsor bonus"
          value={data.today_virtual_commission_to_user}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Today Virtual club bonus"
          value={data.today_virtual_commission_to_club}
        />

        {Title("Monthly")}
        <DashboardElement
          icon={<BiDollar />}
          text="Deposit(this month)"
          value={data.user_deposit_this_month}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Withdraw(this month)"
          value={data.user_withdraw_this_month}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Club Withdraw(this month)"
          value={data.club_withdraw_this_month}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Monthly Profit"
          value={data.monthly_profit}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Monthly Spinner Profit"
          value={data.monthly_spinner_profit}
        />

        {Title("Total")}
        <DashboardElement
          icon={<FaUser />}
          text="Total user"
          value={data.total_user}
        />
        <DashboardElement
          icon={<FaUser />}
          text="Total Club"
          value={data.total_club}
        />
        <DashboardElement
          icon={<FaUser />}
          text="Total Admin"
          value={data.total_admin}
        />
        <DashboardElement
          icon={<FaGamepad />}
          text="Total Game"
          value={data.total_game}
        />

        <DashboardElement
          icon={<BiMoney />}
          text="User balance"
          value={data.total_user_balance}
        />
        <DashboardElement
          icon={<BiMoney />}
          text="Club balance"
          value={data.total_club_balance}
        />

        <DashboardElement
          icon={<BiDollar />}
          text="Total Deposit"
          value={data.total_user_deposit}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total Withdraw"
          value={data.total_user_withdraw}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total Club Withdraw"
          value={data.total_club_withdraw}
        />

        <DashboardElement
          icon={<BiDollar />}
          text="Total Profit"
          value={data.total_profit}
        />

        <DashboardElement
          icon={<BiDollar />}
          text="Total Spinner Profit"
          value={data.total_spinner_profit}
        />

        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total sponsor bonus"
          value={data.total_sponsor_bonus}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total club bonus"
          value={data.total_club_bonus}
        />

        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total Virtual sponsor bonus"
          value={data.total_virtual_commission_to_user}
        />
        <DashboardElement
          icon={<GiMoneyStack />}
          text="Total Virtual club bonus"
          value={data.total_virtual_commission_to_club}
        />

        {Object.entries(OptionGames).map(([game, info]) => {
          return (
            <DashboardElement
              key={game}
              icon={<GiMoneyStack />}
              text={`Total ${info.name} Profit`}
              // @ts-ignore
              value={data[info.name]}
            />
          );
        })}
      </div>

      <GoToUser />
      <GoToClub />
      <PaymentMethods />

      <div className="h-[100px]"></div>
    </AdminPageWrapper>
  );
}

const DashboardElement = ({
  icon,
  text,
  value,
}: {
  icon: ReactElement;
  text: string;
  value: string | number;
}) => {
  const getRandomBg = () => {
    const options = [
      "bg-green-600",
      "bg-green-500",

      "bg-red-600",
      "bg-red-500",

      "bg-yellow-600",
      "bg-yellow-500",

      "bg-blue-600",
      "bg-blue-500",
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  return (
    <>
      <div className="bg-white shadow m-1 p-2 rounded flex items-center flex-row">
        <div className={`${getRandomBg()} text-white p-3 rounded`}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-gray-600">{text.replaceAll("_", "-")}</span>
          <b className="">
            {typeof value == "number" ? Number(value).toFixed(2) : value}
          </b>
        </div>
      </div>
    </>
  );
};
