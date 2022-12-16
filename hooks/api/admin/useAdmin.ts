import axios from "axios";
import useSWR from "swr";
import { AdminConfig, URLs } from "../../../app.config";
import { getCookie, removeCookies } from "cookies-next";
import { IAdmin } from "../../../libs/Models/Admin";

export default function useAdmin() {
  const { data, error, mutate } = useSWR("/admin/get-admin", (url) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = URLs.backend;

    const token = getCookie(AdminConfig.admin_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return axios.get(url).then((res) => res.data.admin);
  });

  const admin: IAdmin = data;

  return {
    admin,
    error,
    isLoading: !admin && !error,
    logout: () => {
      removeCookies(AdminConfig.admin_token);
      mutate("/admin/get-admin", undefined);
    },
  };
}
