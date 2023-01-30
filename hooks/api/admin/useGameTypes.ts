import axios from "axios";
import useSWR from "swr";
import { IGameType } from "../../../libs/Models/Game";

export default function useGameTypes() {
  const { data, error, mutate } = useSWR("/admin/game-types", (url) => {
    return axios.get(url).then((res) => res.data.game_types);
  });

  const gameTypes: IGameType[] = data;

  return {
    gameTypes,
    error,
    isLoading: !gameTypes && !error,
    refresh: mutate,
  };
}
