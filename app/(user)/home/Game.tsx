"use client";

import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { FaTshirt } from "react-icons/fa";
import Collapsible from "../../../components/Html/Collapsible";
import { IGame } from "../../../libs/Models/Game";
import { Status } from "../../../libs/Status";
import { useSocketReciever } from "../../../utils/helpers/SocketHelper";
import Question from "./Question";
import "./styles.scss";

export default function Game({
  initialGame,
  is_single_game,
}: {
  initialGame: IGame;
  is_single_game?: boolean;
}) {
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
    <>
      {is_single_game &&
        (game.youtube_embed_on && game.youtube_embed_link != "" ? (
          <div className="sticky top-[50px] z-10 w-screen flex-center-center overflow-hidden">
            <iframe
              style={{
                width: "100%",
              }}
              src={game.youtube_embed_link}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <GameBanner game={game} />
        ))}

      <Collapsible
        // className={`${game.can_bet ? "bg-gray-200" : "bg-red-200"} mt-1 mx-1`}
        className={` bg-gray-200 mt-1 mx-1/2`}
        trigger={
          <div className="relative flex flex-wrap items-center justify-between break-all p-2">
            <div className="flex items-center">
              <Link href={`/home/${game.id}`}>
                <img
                  className="inline-block mr-2 rounded"
                  src={game.game_type.img}
                  style={{ width: 50, height: 50 }}
                />
              </Link>
              <div className="flex flex-col flex-wrap ml-1">
                <div
                  className="text-sm text-black"
                  style={{ wordBreak: "break-word", fontSize: 16 }}
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

            {game.youtube_embed_on && (
              <AiFillYoutube className="absolute top-1 right-1" />
            )}

            {/* <img
              src="/assets/icons/youtube.png"
              height={20}
              width={20}
              alt=""
              className="absolute top-1 right-1"
            /> */}
          </div>
        }
        isClosed={!is_single_game && game.status == Status.Upcoming}
      >
        <div className=" px-1.5">
          {!is_single_game && (
            <div className="text-white flex justify-around text-md py-0.5 mt-1 mx-0.5 bg-primary text-center">
              {game.live_score && <b>{game.live_score}</b>}

              {game.game_break_time_status && game.starting_time && (
                <GameTime
                  starting_time={new Date(game.starting_time)}
                  game_break_time={game.game_break_time || 0}
                />
              )}
            </div>
          )}

          {game.questions &&
            Object.entries(game.questions).map(([id, question]) => {
              return (
                <Question
                  initialQuestion={question}
                  game={game}
                  key={`question-${id}`}
                  is_single_game={is_single_game}
                />
              );
            })}
        </div>
      </Collapsible>
    </>
  );
}

const GameBanner = ({ game }: { game: IGame }) => {
  const colors = [
    "text-green-500",
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "text-orange-500",
    "text-cyan-500",
    "text-indigo-500",
  ];

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="sticky top-[50px] z-10  text-center text-white w-screen">
      <div className="single-game-bg py-5 flex-center-center flex-col">
        <div className="flex-center-center text-gray-400 mb-3">
          {game.short_description}
        </div>

        <div className="flex justify-between items-center">
          <b className="p-2 w-1/3 flex-center-center flex-col">
            <FaTshirt size={60} className={randomColor()} />
            {game.team1}
          </b>
          <div className="w-1/3 flex flex-col justify-center items-center px-3">
            {/* <img
              className="inline-block mb-1 rounded"
              src={game.game_type.img}
              style={{ width: 70, height: 70 }}
            /> */}

            <span className="text-gray-50 text-xs">{game.starting_time}</span>
            <TimeLeftToStart starting_time={new Date(game.starting_time)} />
            {/* timer */}
            {game.game_break_time_status && game.starting_time && (
              <GameTime
                is_single_game={true}
                starting_time={new Date(game.starting_time)}
                game_break_time={game.game_break_time || 0}
              />
            )}
          </div>
          <b className="p-2 w-1/3 flex-center-center flex-col">
            <FaTshirt size={60} className={randomColor()} />
            {game.team2}
          </b>
        </div>
      </div>

      <div className="w-full flex justify-around items-center bg-primary p-2">
        <b>{game.live_score}</b>
      </div>
    </div>
  );
};

const GameTime = ({
  starting_time,
  game_break_time,
  is_single_game,
}: {
  starting_time: Date;
  game_break_time: number;
  is_single_game?: boolean;
}) => {
  const [time, timeSet] = useState({
    min: 0,
    sec: 0,
  });
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

        timeSet({
          min: minutes,
          sec: seconds,
        });
      }, 1000)
    );
  };

  useEffect(() => {
    start();
  }, [starting_time, game_break_time]);

  if (is_single_game) {
    return (
      <div className="bg-black/70 mt-2 px-3 py-1 rounded-sm">
        <div className="flex-center-center text-[20px]">
          <div className="flex flex-col">
            <b>{time.min}</b>
            <span className="text-[13px] text-gray-500">min</span>
          </div>
          <div className="flex flex-col">
            <b className="mx-1">:</b>
            <b className="mx-1 text-[13px] text-gray-500">:</b>
          </div>

          <div className="flex flex-col">
            <b>{time.sec}</b>
            <span className="text-[13px] text-gray-500">sec</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {time.min}:{time.sec}
    </div>
  );
};

const TimeLeftToStart = ({ starting_time }: { starting_time: Date }) => {
  const [time, timeSet] = useState({
    hrs: 0,
    min: 0,
    sec: 0,
  });
  const [timer, timerSet] = useState<NodeJS.Timer>();
  const start_moment = moment(starting_time);

  const start = () => {
    if (timer) clearInterval(timer);

    timerSet(
      setInterval(() => {
        let diff = start_moment.diff(moment(), "seconds");

        let m = Math.floor(diff / 60);
        let s = diff - m * 60;

        let h = Math.floor(m / 60);
        m = m - h * 60;

        timeSet({
          hrs: h,
          min: m,
          sec: s,
        });

        // console.log({ h, m, s, diff });
      }, 1000)
    );
  };

  useEffect(() => {
    start();
  }, [starting_time]);

  if (start_moment.isBefore()) return null;

  return (
    <div className="bg-black/70 mt-2 px-3 py-1 rounded-sm">
      <div className="flex-center-center text-[20px]">
        <div className="flex flex-col">
          <b>{time.hrs}</b>
          <span className="text-[13px] text-gray-500">hrs</span>
        </div>
        <div className="flex flex-col">
          <b className="mx-1">:</b>
          <b className="mx-1 text-[13px] text-gray-500">:</b>
        </div>

        <div className="flex flex-col">
          <b>{time.min}</b>
          <span className="text-[13px] text-gray-500">min</span>
        </div>
        <div className="flex flex-col">
          <b className="mx-1">:</b>
          <b className="mx-1 text-[13px] text-gray-500">:</b>
        </div>

        <div className="flex flex-col">
          <b>{time.sec}</b>
          <span className="text-[13px] text-gray-500">sec</span>
        </div>
      </div>
    </div>
  );
};
