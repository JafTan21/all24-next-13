import axios from "axios";
import useSWR from "swr";

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

export default function useClubDashboard() {
  const { data: d, error } = useSWR("/club/club-dashboard", (url) => {
    return axios.get(url).then((res) => res.data);
  });

  const data: IClubDashboard = d;

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
