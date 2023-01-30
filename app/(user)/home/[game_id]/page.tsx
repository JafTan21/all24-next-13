"use client";

import React from "react";
import Loading from "../../../../components/Html/Loading";
import ToastWrapper from "../../../../components/Wrappers/ToastWrapper";
import useGame from "../../../../hooks/api/useGame";
import Game from "../Game";

export default function SingleGame(props: { params: { game_id: number } }) {
  const game_id = Number(props?.params?.game_id);

  const { game, isLoading } = useGame(game_id);

  if (isLoading) return <Loading />;

  if (!game_id || typeof game_id != "number" || game_id <= 0) {
    return (
      <div className="bg-red-200 text-red-500 font-bold p-3 rounded border border-red-500 m-2">
        Game Not Found.
      </div>
    );
  }

  return (
    <ToastWrapper>
      <Game initialGame={game[game_id]} is_single_game={true} />
    </ToastWrapper>
  );
}
