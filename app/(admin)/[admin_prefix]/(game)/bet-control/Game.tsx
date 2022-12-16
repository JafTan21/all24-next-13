import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiCloset } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { mutate } from "swr";
import Collapsible from "../../../../../components/Html/Collapsible";
import ToggleButton from "../../../../../components/Html/ToggleButton";
import StopPropagation from "../../../../../components/Wrappers/StopPropagation";
import useForm from "../../../../../hooks/useForm";
import { IGame } from "../../../../../libs/Models/Game";
import { IQuestion } from "../../../../../libs/Models/Question";
import { Status } from "../../../../../libs/Status";
import ErrorHandler from "../../../../../utils/helpers/ErrorHandler";
import AddQuestion from "./AddQuestion";
import EditGame from "./EditGame";
import Question from "./Question";

export const NotSet = () => (
  <span className="text-red-600 text-underline">not set</span>
);

const Info = ({ game }: { game: IGame }) => {
  return (
    <div className="cursor-pointer inline">
      <strong>
        {game.team1}
        <span className="text-yellow-500"> vs </span>
        {game.team2}
      </strong>
      |
      <span>
        Live score: <strong>{game.live_score || <NotSet />}</strong>
      </span>
      |
      <span>
        Description:
        <strong> {game.short_description || <NotSet />}</strong>
      </span>
      |
      <span>
        Start: <strong>{game.starting_time || <NotSet />}</strong>
      </span>
      |
      <span>
        End: <strong>{game.ending_time || <NotSet />}</strong>
      </span>
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

  const update = (newData: Partial<IGame>) => {
    axios
      .put(`/admin/game/${game.id}`, { ...game, ...newData })
      .then((res) => {
        gameSet(res.data.game);
        refresh();
      })
      .catch(ErrorHandler);
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

  if (game.status == Status.Closed || initialGame.is_hidden != game.is_hidden)
    return null;

  return (
    <div className="mt-1">
      <Collapsible
        isClosed={game.is_area_hidden}
        trigger={
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
                  isActive={game.show_to_users}
                  onClick={(e) =>
                    update({ show_to_users: !game.show_to_users })
                  }
                />
                <ToggleButton
                  on="Bet"
                  off="No bet"
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
                  Load Questions
                </button>
                <button
                  className="admin-game-btn bg-blue-600"
                  onClick={(e) =>
                    window.confirm("Are you sure?") &&
                    update({
                      status:
                        game.status == Status.Live
                          ? Status.Upcoming
                          : Status.Live,
                    })
                  }
                >
                  Change Status
                </button>
                <ToggleButton
                  on="Are-Show"
                  off="Area-Hide"
                  isActive={!game.is_area_hidden}
                  onClick={(e) =>
                    update({ is_area_hidden: !game.is_area_hidden })
                  }
                />

                <span>
                  (bets:{game.bets_count || 0},<b>{game.bets_amount || 0}</b>
                  bdt)
                </span>
                <span>(multibets:{game.multibets_count || 0}) </span>
                <b className="mx-1">(limit:{game.total_limit || 0}) </b>
                <span>added by: {game.added_by_email}</span>
              </StopPropagation>
            </div>
          </div>
        }
      >
        {/* questions */}
        <div>
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
