import axios from "axios";
import useSWR, { mutate } from "swr";
import AppConfig, { URLs } from "../../app.config";
import { getCookie, removeCookies } from "cookies-next";

export default function useUser() {
  const { data: user, error } = useSWR("/user/user", (url) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = URLs.backend;

    const token = getCookie(AppConfig.user_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return axios.get("/user/user").then((res) => res.data.user);
  });

  return {
    user,
    error,
    isLoading: !user && !error,
    logout: () => {
      removeCookies(AppConfig.user_token);
      mutate("/user/user", undefined);
    },
  };
}
