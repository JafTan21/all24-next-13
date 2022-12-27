"use client";

import React, { useState } from "react";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";
import Question from "./Question";

export default function Game({ initialGame }: { initialGame: IGame }) {
  const [game, gameSet] = useState(initialGame);
  useSocketReciever(`update-game-${initialGame.id}`, (data) => {
    gameSet((prev) => ({ ...prev, ...data }));
  });

  return (
    <Collapsible
      className="bg-gray-200 mt-1 mx-1"
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
      <div className="">
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
