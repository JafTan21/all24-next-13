import axios from "axios";
import useSWR from "swr";

export default function useResellerUsernames() {
  const { data: reseller_usernames, error } = useSWR(
    "/user/resellers",
    (url) => {
      return axios.get(url).then((res) => res.data.reseller_usernames);
    }
  );

  return {
    reseller_usernames,
    error,
  };
}
