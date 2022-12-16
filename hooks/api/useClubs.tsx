import axios from "axios";
import { BiLogIn } from "react-icons/bi";
import useSWR from "swr";
import { ClubConfig } from "../../app.config";
import ErrorHandler from "../../utils/helpers/ErrorHandler";
import { adminSuccessNotification } from "../../utils/helpers/NotificationHelper";

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
