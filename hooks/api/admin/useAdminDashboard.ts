import axios from "axios";
import useSWR from "swr";
import { AdminConfig, URLs } from "../../../app.config";
import { getCookie } from "cookies-next";

interface IAdminDashboardData {
  total_user_balance: number;
  total_club_balance: number;

  total_user: number;
  total_club: number;

  today_club_withdraw: number;
  today_user_withdraw: number;
  today_user_deposit: number;

  total_user_deposit: number;
  total_user_withdraw: number;
  total_club_withdraw: number;

  today_spinner_profit: number;
  monthly_spinner_profit: number;
  total_spinner_profit: number;

  user_deposit_this_month: number;
  user_withdraw_this_month: number;
  club_withdraw_this_month: number;

  total_admin: number;
  total_game: number;
  total_bets_amount: number;
  total_bets_win: number;
  total_bets_count: number;
  total_multibets_amount: number;
  total_multibets_win: number;
  total_multibets_count: number;
  total_sponsor_bonus: number;
  total_club_bonus: number;
  today_refund: number;

  total_bet_pending_amount: number;

  total_profit: number;
  monthly_profit: number;
  today_profit: number;

  today_sponsor_bonus: number;
  today_club_bonus: number;
  today_virtual_commission_to_user: number;
  today_virtual_commission_to_club: number;
  total_virtual_commission_to_user: number;
  total_virtual_commission_to_club: number;

  // super club
  today_super_commission: number;
  monthly_super_commission: number;
  total_super_commission: number;

  // 2nd admin
  monthly_game_profit: number;
  today_game_profit: number;
  total_game_profit: number;
}

export default function useAdminDashboard() {
  const { data: d, error } = useSWR("/admin/admin-dashboard", (url) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = URLs.backend;

    const token = getCookie(AdminConfig.admin_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return axios.get(url).then((res) => res.data);
  });

  const data: IAdminDashboardData = d;

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
