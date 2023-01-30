import axios from "axios";
import useSWR from "swr";
import { IGame } from "../../libs/Models/Game";

export default function useGame(game_id: number) {
  const { data, error } = useSWR(`/user/game?game_id=${game_id}`, (url) => {
    return axios.get(url).then((res) => res.data.games);
  });

  const game: IGame[] = data;

  return {
    game,
    error,
    isLoading: !game && !error,
  };
}
