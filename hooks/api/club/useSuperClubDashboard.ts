import axios from "axios";
import useSWR from "swr";

interface ISuperClubDashboard {
  today_super_commission: number;
  monthly_super_commission: number;
  total_super_commission: number;
}

export default function useSuperClubDashboard() {
  const { data: d, error } = useSWR("/club/super-club-dashboard", (url) => {
    return axios.get(url).then((res) => res.data);
  });

  const data: ISuperClubDashboard = d;

  return {
    data,
    error,
    isLoading: !data && !error,
  };
}
