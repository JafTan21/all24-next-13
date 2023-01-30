import axios from "axios";
import useSWR from "swr";
import AppConfig, { URLs } from "../../app.config";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { IUser } from "../../libs/Models/User";
import { adminSuccessNotification } from "../../utils/helpers/NotificationHelper";
import moment from "moment";
import ErrorHandler from "../../utils/helpers/ErrorHandler";
import { BiLogIn } from "react-icons/bi";

export default function useUser() {
  const { data, error, mutate } = useSWR("/user/user", (url) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = URLs.backend;

    const token = getCookie(AppConfig.user_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return axios.get("/user/user").then((res) => res.data.user);
  });

  const user: IUser = data;

  return {
    user,
    mutateUser: mutate,
    error,
    isLoading: !user && !error,
    logout: () => {
      removeCookies(AppConfig.user_token);
      mutate("/user/user", undefined);
      window.location.href = "/";
    },
  };
}

const login_to_user = (id: number) => {
  axios
    .post("/admin/user-login/" + id)
    .then((res) => {
      adminSuccessNotification(res.data.message);
      setCookie(AppConfig.user_token, res.data.token, {
        expires: moment().add(60, "days").toDate(),
      });

      window.open("/");
    })
    .catch(ErrorHandler);
};

export const LoginToUserButton = ({ user_id }: { user_id: number }) => {
  return (
    <button
      onClick={() => login_to_user(user_id)}
      className="flex-center-center bg-green-700 text-white py-1 px-2 mt-1 mb-3 rounded"
    >
      <BiLogIn /> Login
    </button>
  );
};
