import axios from "axios";
import useSWR from "swr";

export default function useClubs() {
  const { data: clubs, error } = useSWR("/user/club", (url) => {
    return axios.get(url).then((res) => res.data.data);
  });

  return {
    clubs,
    error,
    isLoading: !clubs && !error,
  };
}
