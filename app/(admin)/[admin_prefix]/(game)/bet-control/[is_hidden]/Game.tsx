import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { AiFillYoutube, AiOutlineCloseCircle } from "react-icons/ai";
import Collapsible from "../../../../../../components/Html/Collapsible";
import ToggleButton from "../../../../../../components/Html/ToggleButton";
import StopPropagation from "../../../../../../components/Wrappers/StopPropagation";
import useForm, { verifyCSRF } from "../../../../../../hooks/useForm";
import { IGame } from "../../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../../libs/Models/Question";
import { Status } from "../../../../../../libs/Status";
import { withAdminPrefix } from "../../../../../../utils/admin/adminHelpers";
import ErrorHandler from "../../../../../../utils/helpers/ErrorHandler";
import {
  makeSafeData,
  useSocketUpdater,
} from "../../../../../../utils/helpers/SocketHelper";
import { useWebSocket } from "../../../../../WebSocket";
import { useBetDetailsUpdater } from "../useBetDetailsUpdater";
import AddQuestion from "./AddQuestion";
import EditGame from "./EditGame";
import Question from "./Question";

export const NotSet = () => (
  <span className="text-red-600 text-underline">not set</span>
);

export const Separator = () => {
  return <span className="mx-1">|</span>;
};

const Key = (text: string) => {
  return <span className="text-gray-400">{text}</span>;
};
export const Value = ({ text }: { text: ReactNode }) => {
  return <b>{text}</b>;
};

export const BoldOrNormalNumber = ({
  num,
  after,
  before,
}: {
  num: number;
  after?: string;
  before?: string;
}) => {
  if (num > 0)
    return (
      <b>
        {before}
        {num}
        {after}
      </b>
    );

  return (
    <>
      {before}
      {num}
      {after}
    </>
  );
};

const Info = ({ game }: { game: IGame }) => {
  return (
    <div className="cursor-pointer inline">
      <strong>
        {game.team1}
        <span className="text-yellow-500"> vs </span>
        {game.team2}
      </strong>

      {game.live_score && (
        <>
          <Separator />
          {Key("Live score: ")}
          <Value text={game.live_score || <NotSet />} />
        </>
      )}

      {game.short_description && (
        <>
          <Separator />
          {Key("Description: ")}
          <Value text={game.short_description || <NotSet />} />
        </>
      )}

      {game.starting_time && (
        <>
          <Separator />
          <span>
            {Key("Start: ")}
            <Value text={game.starting_time || <NotSet />} />
          </span>
        </>
      )}

      {game.ending_time && (
        <>
          <Separator />
          <span>
            {Key("End: ")}
            <Value text={game.ending_time || <NotSet />} />
          </span>
        </>
      )}
    </div>
  );
};

export default function Game({
  initialGame,
  refresh,
}: {
  initialGame: IGame;
  refresh: () => void;
}) {
  const [game, gameSet] = useState(initialGame);
  const gameSafeFields: (keyof IGame)[] = [
    "id",
    "team1",
    "team2",
    "live_score",
    "status",
    "can_bet",
    "short_description",
    "starting_time",
    "ending_time",
    "show_to_users",
    "game_break_time",
    "game_break_time_status",

    "youtube_embed_link",
    "youtube_embed_on",
  ];
  useSocketUpdater(
    game,
    gameSafeFields.filter((d) => d != "status"),
    "update-game"
  );
  useBetDetailsUpdater<IGame>(`update-game-${game.id}-bet-details`, gameSet);

  const { socket } = useWebSocket();

  const addQuestion = (q: IQuestion) => {
    gameSet((prev) => {
      return {
        ...prev,
        questions: {
          ...prev.questions,
          [q.id]: q,
        },
      };
    });
  };

  const update = (
    newData: Partial<IGame>,
    cb?: (updatedGame: IGame) => void
  ) => {
    verifyCSRF(() => {
      axios
        .put(`/admin/game/${game.id}`, { ...game, ...newData })
        .then((res) => {
          gameSet(res.data.game);
          refresh();
          cb && cb(res.data.game);
        })
        .catch(ErrorHandler);
    });
  };

  const { submitWithoutForm: loadQuestions } = useForm({
    initialState: null,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/admin/game/" + game.id + "/load")
          .then((res) => {
            gameSet(res.data.game);
            resolve(res.data);
          })
          .catch(reject);
      });
    },
  });

  // for upper row
  const [liveScore, liveScoreSet] = useState(game.live_score || "");
  const [gameTime, gameTimeSet] = useState<number | undefined>(
    game.game_break_time || 0
  );

  if (game.status == Status.Closed || initialGame.is_hidden != game.is_hidden) {
    return null;
  }

  return (
    <div className="mt-1">
      {/* top part */}
      <div
        className={"flex items-center flex-wrap relative ".concat(
          game.ending_time != "" && moment(game.ending_time).isBefore()
            ? "bg-red-400 mt-2 p-1"
            : "bg-green-400 mt-2 p-1"
        )}
      >
        {game.ending_time && moment(game.ending_time).isBefore()
          ? "Time ended"
          : "Running time"}

        <input
          className="ml-3"
          type="text"
          placeholder="Live Score"
          onChange={(e) => liveScoreSet(e.target.value)}
          value={liveScore}
        />
        {Number(game.game_type_id) == 2 || Number(game.game_type_id) == 15 ? (
          <input
            className="mx-2"
            style={{ width: "60px" }}
            type="number"
            placeholder="Game Time"
            onChange={(e) => gameTimeSet(Number(e.target.value) || undefined)}
            value={gameTime}
          />
        ) : (
          ""
        )}
        <button
          className="bg-green-600 text-white px-1 rounded"
          onClick={(e) =>
            update({
              live_score: liveScore,
              game_break_time: gameTime,
            })
          }
        >
          save
        </button>
        <ToggleButton
          on="showing"
          off="hidden"
          isActive={!game.is_hidden}
          onClick={(e) =>
            window.confirm("Are you sure?") &&
            update({ is_hidden: !game.is_hidden })
          }
        />

        {Number(game.game_type_id) == 2 || Number(game.game_type_id) == 15 ? (
          <ToggleButton
            on="time-on"
            off="time-off"
            isActive={game.game_break_time_status}
            onClick={(e) =>
              update({
                game_break_time_status: !game.game_break_time_status,
              })
            }
          />
        ) : (
          ""
        )}

        <Link
          href={withAdminPrefix("bet-control/" + game.id)}
          target={`_single_game_${game.id}`}
        >
          <button className="admin-game-btn bg-yellow-500">Enter</button>
        </Link>

        {game.youtube_embed_on && (
          <span className="absolute top-1 right-1">
            <AiFillYoutube size={22} className="mx-1" />
          </span>
        )}
      </div>
      <Collapsible
        isClosed={game.is_area_hidden}
        trigger={
          <>
            <div
              className="flex items-center px-2 py-1 text-white text-[15px]"
              style={{
                background: game.can_bet ? "#203F61" : "#3a2b27",
              }}
            >
              <Image
                alt=""
                height={40}
                width={40}
                src={game.game_type.img}
                className="w-[40px] h-[40px]"
              />
              <div className="ml-2 ">
                <Info game={game} />
                <StopPropagation className="inline">
                  <EditGame initialGame={game} initialGameSet={gameSet} />
                  <AddQuestion initialGame={game} addQuestion={addQuestion} />
                  <ToggleButton
                    on="Show"
                    off="Hide"
                    activeClass="bg-green-500 text-white"
                    inactiveClass="bg-red-500 text-white"
                    width={50}
                    isActive={game.show_to_users}
                    onClick={(e) =>
                      update({ show_to_users: !game.show_to_users })
                    }
                  />
                  <ToggleButton
                    on="Bet"
                    off="No bet"
                    activeClass="bg-green-500 text-white"
                    inactiveClass="bg-red-500 text-white"
                    width={60}
                    isActive={game.can_bet}
                    onClick={(e) => update({ can_bet: !game.can_bet })}
                  />
                  <button
                    className="admin-game-btn bg-blue-600"
                    onClick={(e) =>
                      window.confirm("Are you sure?") &&
                      update({ status: Status.Closed })
                    }
                  >
                    <span className="flex-center-center">
                      <AiOutlineCloseCircle /> close
                    </span>
                  </button>
                  <button
                    onClick={loadQuestions}
                    className="admin-game-btn bg-blue-600"
                  >
                    Load Ques.
                  </button>
                  <button
                    className="admin-game-btn bg-blue-600"
                    onClick={(e) =>
                      window.confirm("Are you sure?") &&
                      update(
                        {
                          status:
                            game.status == Status.Live
                              ? Status.Upcoming
                              : Status.Live,
                        },
                        (updatedGame) => {
                          socket?.emit("change-game-status", {
                            data: makeSafeData(updatedGame, gameSafeFields),
                          });
                        }
                      )
                    }
                  >
                    Change Status
                  </button>
                  <ToggleButton
                    on="Are-Show"
                    off="Area-Hide"
                    inactiveClass="bg-red-500 text-white"
                    isActive={!game.is_area_hidden}
                    onClick={(e) =>
                      update({ is_area_hidden: !game.is_area_hidden })
                    }
                  />
                  <span className="mx-1">
                    ({Key("bets: ")} {game.bets_count || 0},
                    <b> {game.bets_amount || 0}</b>$)
                  </span>
                  <span className="mx-1">
                    ({Key("multi: ")}
                    <b className="text-red-500">{game.multibets_count || 0}</b>)
                  </span>
                  <span className="mx-1">
                    ({Key("limit: ")} {game.total_limit || 0})
                  </span>
                  <span className="mx-1">
                    ({Key("added by: ")} {game.added_by_email})
                  </span>
                </StopPropagation>
              </div>
            </div>
          </>
        }
      >
        {/* questions */}
        <div className="bg-red-600">
          {game.questions &&
            Object.values(game.questions).map((question, idx) => {
              return (
                <Question
                  key={question.id}
                  initialQuestion={question}
                  initialGame={game}
                />
              );
            })}
        </div>
      </Collapsible>
    </div>
  );
}
