"use client";

import React, { useEffect, useMemo, useState } from "react";
import AdminPageWrapper from "../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../hooks/useSearch";
import { IGame } from "../../../../../libs/Models/Game";
import { Status } from "../../../../../libs/Status";

import AddGame from "./AddGame";
import GameGroup from "./GameGroup";

export default function BetControl() {
  const {
    SearchBar,
    data: initialGames,
    paginator,
    refresh,
  } = useSearch<{ [id: number]: IGame }>({
    url: "/admin/game",
    params: {
      is_hidden_page: "false",
    },
  });

  const [games, gamesSet] = useState(initialGames);

  const all = useMemo(() => {
    return games ? Object.values(games) : [];
  }, [games]);
  const live = useMemo(() => {
    return all.filter((g) => g.status == Status.Live);
  }, [all]);
  const upcoming = useMemo(() => {
    return all.filter((g) => g.status == Status.Upcoming);
  }, [all]);

  useEffect(() => {
    gamesSet(initialGames);
  }, [initialGames]);

  return (
    <AdminPageWrapper>
      <div className="m-2 bg-white p-2 rounded shadow">
        <AddGame
          addGame={(game) => {
            gamesSet((prev) => {
              return {
                ...prev,
                [game.id]: game,
              };
            });
          }}
        />
      </div>
      {SearchBar}
      {live && (
        <GameGroup initialGames={live} refresh={refresh} title="Live Games" />
      )}
      {upcoming && (
        <GameGroup
          initialGames={upcoming}
          refresh={refresh}
          title="Upcoming Games"
        />
      )}
      {paginator}

      <div className="mb-5"></div>
    </AdminPageWrapper>
  );
}