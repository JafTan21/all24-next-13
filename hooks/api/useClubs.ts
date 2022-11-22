import axios from "axios";
import useSWR from "swr";

export default function useClubs() {
  const { data: clubs, error } = useSWR("/user/club", (url) => {
    return axios.get(url).then((res) => res.data.clubs);
  });

  return {
    clubs,
    error,
    isLoading: !clubs && !error,
  };
}
