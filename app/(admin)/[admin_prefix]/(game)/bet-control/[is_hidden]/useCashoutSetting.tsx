import axios from "axios";
import useSWR from "swr";
import { ISetting } from "../../../../../../libs/Models/Setting";

export default function useCashoutSetting() {
  const { data, error } = useSWR(`/admin/setting?key=cashout`, (url) => {
    return axios.get(url).then((res) => res.data.data);
  });

  const cashout_setting: ISetting = data;

  return {
    cashout_setting,
    error,
    isLoading: !cashout_setting && !error,
  };
}
