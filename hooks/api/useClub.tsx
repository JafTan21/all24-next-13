import axios from "axios";
import useSWR from "swr";
import { ClubConfig, URLs } from "../../app.config";
import { getCookie, removeCookies, setCookie } from "cookies-next";
import { IClub } from "../../libs/Models/Club";
import { adminSuccessNotification } from "../../utils/helpers/NotificationHelper";
import moment from "moment";
import ErrorHandler from "../../utils/helpers/ErrorHandler";
import { BiLogIn } from "react-icons/bi";

export default function useClub() {
  const { data, error, mutate } = useSWR("/club/get-club", (url) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = URLs.backend;

    const token = getCookie(ClubConfig.club_token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return axios.get(url).then((res) => res.data.club);
  });

  const club: IClub = data;

  return {
    club,
    mutateClub: mutate,
    error,
    isLoading: !club && !error,
    logout: () => {
      removeCookies(ClubConfig.club_token);
      mutate("/club/get-club", undefined);
      window.location.href = "/";
    },
  };
}

const login_to_club = (id: number) => {
  axios
    .post("/admin/club-login/" + id)
    .then((res) => {
      adminSuccessNotification(res.data.message);
      setCookie(ClubConfig.club_token, res.data.club_token, {
        expires: moment().add(60, "days").toDate(),
      });

      window.open("/club");
    })
    .catch(ErrorHandler);
};

export const LoginToClubButton = ({ club_id }: { club_id: number }) => {
  return (
    <button
      onClick={() => login_to_club(club_id)}
      className="flex-center-center bg-green-700 text-white py-1 px-2 mt-1 mb-3 rounded"
    >
      <BiLogIn /> Login
    </button>
  );
};
