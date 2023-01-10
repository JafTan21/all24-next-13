"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { Status } from "../../../libs/Status";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";
import Question from "./Question";

export default function Game({ initialGame }: { initialGame: IGame }) {
  const [game, gameSet] = useState(initialGame);
  useSocketReciever(`update-game-${initialGame.id}`, (data) => {
    gameSet((prev) => ({ ...prev, ...data }));
  });

  if (
    !game.show_to_users ||
    game.status == Status.Closed ||
    (game.ending_time && moment(game.ending_time).isBefore())
  ) {
    return null;
  }

  return (
    <Collapsible
      className={`${game.can_bet ? "bg-gray-200" : "bg-red-200"} mt-1 mx-1`}
      trigger={
        <div className="flex flex-wrap items-center justify-between break-all p-2">
          <div className="flex items-center">
            <img
              className="inline-block mr-2 rounded"
              src={game.game_type.img}
              style={{ width: 50, height: 50 }}
            />
            <div className="flex flex-col flex-wrap ml-1">
              <div
                className="text-sm text-black"
                style={{ wordBreak: "break-word", fontSize: 18 }}
              >
                <b>{game.team1}</b>
                <span className="px-1 text-yellow-600 lowercase">VS</span>
                <b>{game.team2}</b>
              </div>
              <div
                className="text-sm text-gray-600"
                style={{ wordBreak: "break-word" }}
              >
                {game.short_description} ||
                <span className="ml-1">{game.starting_time}</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div>
        <div className="text-white flex justify-around text-md py-0.5 mt-1 bg-primary text-center">
          {game.live_score && <b>{game.live_score}</b>}

          {game.game_break_time_status && game.starting_time && (
            <GameTime
              starting_time={new Date(game.starting_time)}
              game_break_time={game.game_break_time || 0}
            />
          )}
        </div>

        {game.questions &&
          Object.entries(game.questions).map(([id, question]) => {
            return (
              <Question
                initialQuestion={question}
                game={game}
                key={`question-${id}`}
              />
            );
          })}
      </div>
    </Collapsible>
  );
}

const GameTime = ({
  starting_time,
  game_break_time,
}: {
  starting_time: Date;
  game_break_time: number;
}) => {
  const [time, timeSet] = useState("");
  const [timer, timerSet] = useState<NodeJS.Timer>();

  const start = () => {
    if (timer) clearInterval(timer);

    timerSet(
      setInterval(() => {
        let time =
          moment().diff(moment(starting_time), "seconds") -
          game_break_time * 60;

        // let hours = Math.floor(time / 3600);
        // let minutes = Math.floor((time - (hours * 3600)) / 60);
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timeSet(`${minutes}:${seconds}`);
      }, 1000)
    );
  };

  useEffect(() => {
    start();
  }, [starting_time, game_break_time]);

  return <div className="">{time}</div>;
};
