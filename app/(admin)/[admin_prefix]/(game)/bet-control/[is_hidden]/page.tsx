"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useAdminDashboard from "../../../../../../hooks/api/admin/useAdminDashboard";
import useSearch from "../../../../../../hooks/useSearch";
import { IGame } from "../../../../../../libs/Models/Game";
import { Status } from "../../../../../../libs/Status";
import { hrefWithAdminPrefix } from "../../../../SideLink";
import AddGame from "./AddGame";
import GameGroup from "./GameGroup";

const BetControlDashboard = () => {
  const { data: dashboardData } = useAdminDashboard();

  return (
    <div className="bg-white m-1 p-1 rounded shadow flex flex-wrap">
      <p className="mx-1  rounded">
        User Balance:
        <b>{Number(dashboardData?.total_user_balance).toFixed(2)}</b>
      </p>
      <p className="mx-1 rounded ">
        || Today Profit:
        <b>{Number(dashboardData?.today_profit).toFixed(2)}</b>
      </p>
      <p className="mx-1  rounded">
        || Total Profit:
        <b>{Number(dashboardData?.total_profit).toFixed(2)}</b>
      </p>
    </div>
  );
};

export default function BetControl(props: any) {
  const is_hidden_page: boolean = props?.params?.is_hidden == "hidden";
  const game_id = props?.params?.is_hidden; // normal | hidden | <game_id>
  const is_single_game_page = !["normal", "hidden"].includes(
    props?.params?.is_hidden
  );

  const {
    SearchBar,
    data: initialGames,
    paginator,
    refresh,
  } = useSearch<{ [id: number]: IGame }>({
    url: "/admin/game",
    params: {
      is_hidden_page: is_hidden_page,
      game_id: is_single_game_page ? game_id : null,
    },
  });

  const [games, gamesSet] = useState(initialGames);
  useEffect(() => {
    gamesSet(initialGames);
  }, [initialGames]);

  // memo, object({id: game}) to array of games
  const all = useMemo(() => {
    return games ? Object.values(games) : [];
  }, [games]);
  const live = useMemo(() => {
    return all.filter((g) => g.status == Status.Live);
  }, [all]);
  const upcoming = useMemo(() => {
    return all.filter((g) => g.status == Status.Upcoming);
  }, [all]);

  return (
    <AdminPageWrapper title={`Bet Control ${is_hidden_page ? "Hidden" : ""}`}>
      <BetControlDashboard />

      {/* buttons (add, normal, hidden) */}
      <div className="m-2 bg-white p-2 rounded shadow flex">
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
        {is_single_game_page && (
          <Link href={hrefWithAdminPrefix("bet-control/normal")}>
            <button className="ml-2 bg-green-500 text-white flex-center-center px-3 py-2 rounded shadow">
              Bet Control
            </button>
          </Link>
        )}
        <Link
          href={hrefWithAdminPrefix(
            "bet-control/" + (is_hidden_page ? "normal" : "hidden")
          )}
        >
          <button className="ml-2 bg-green-500 text-white flex-center-center px-3 py-2 rounded shadow">
            {is_hidden_page ? "Bet Control" : "Hidden Bet Control"}
          </button>
        </Link>
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

export const revalidate = 0;
