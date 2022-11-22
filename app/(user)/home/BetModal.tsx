import React, { useState } from "react";
import { IAnswer } from "../../../libs/Models/Answer";
import { AiOutlineLeft } from "react-icons/ai";
import { IQuestion } from "../../../libs/Models/Question";
import { IGame } from "../../../libs/Models/Game";
import SubmitButton from "../../../components/Html/SubmitButton";
import BackBox from "../../../components/Html/BackBox";

import { motion as m, AnimatePresence } from "framer-motion";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import Image from "next/image";
import { successNotification } from "../../../utils/helpers/NotificationHelper";

interface Props {
  show: boolean;
  showSet: (show: boolean) => void;
  answer: IAnswer;
  question: IQuestion;
  game: IGame;
}

export default function BetModal({
  show,
  showSet,
  answer,
  game,
  question,
}: Props) {
  const styles = {
    pill: {
      background: "blue",
      padding: "2px 6px",
      borderRadius: "10px",
      fontSize: ".8rem",
      marginLeft: "5px",
      height: "20px",
    },
  };

  const { state, onChange, onSubmit, updateState, isSubmitting } = useForm({
    initialState: {
      amount: 100,
    },
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/bet", {
            answer_id: answer.id,
            question_id: question.id,
            game_id: game.id,
            amount: state.amount,
          })
          .then((res) => {
            successNotification(res.data.message);
            showSet(false);
            resolve(res);
          })
          .catch(reject);
      });
    },
  });

  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 100 }}
          onClick={() => showSet(false)}
          className="absolute top-0 left-0 right-0 w-screen h-screen scro"
        >
          <BackBox
            title="Place Bet"
            className="bg-gray-300 shadow-lg fixed left-0 right-0"
            onBackButtonClick={() => showSet(false)}
          >
            <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
              <div className="w-full bg-white border ">
                <div className="px-2 py-1">
                  <div style={{ wordBreak: "break-word" }}>
                    <div className="flex items-center">
                      <img
                        alt={game.game_type.name}
                        src={game.game_type.img}
                        className="inline rounded w-[40px] h-[40px]"
                      />

                      <div
                        className="mx-2 text-gray-700"
                        style={{ fontSize: 16 }}
                      >
                        <strong>{game.team1}</strong>
                        <b className="px-1 text-yellow-500">VS</b>
                        <strong>{game.team2}</strong>
                        <div className="inline mx-1 text-sm text-gray-600">
                          | {game?.short_description} ||
                          <span className="ml-1">{game?.starting_time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 font-bold border rounded">
                      <div className="flex flex-wrap items-center text-gray-700">
                        Qs:
                        <span className="ml-1">{question.question}</span>
                        <span className="mx-1">|</span>
                        Ans:
                        <span className="ml-1">{answer.answer}</span>
                        <span
                          className="flex items-center justify-center text-white"
                          style={styles.pill}
                        >
                          {Number(answer?.rate || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <input
                      type="number"
                      placeholder="Bet amount"
                      className="bg-white px-4 py-1 text-gray-900  border border-gray-900 rounded outline-none w-full focus:ring-2 focus:ring-indigo-400"
                      value={state.amount || ""}
                      name="amount"
                      onChange={onChange}
                      required={true}
                    />

                    <div className="flex flex-wrap items-center justify-center">
                      {[
                        20, 100, 200, 500, 1000, 1500, 2000, 3000, 5000, 7000,
                        10000,
                      ].map((num) => {
                        return (
                          <button
                            onClick={() => updateState({ amount: num })}
                            type="button"
                            key={`bet-amount-${num}`}
                            className="px-1 py-0.5 m-0.5 text-white rounded bg-lime-600"
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-1 text-sm font-bold">
                      <div className="flex justify-between">
                        <span>Total Stake:</span>
                        <span>{Number(state.amount || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Option Rating:</span>
                        <span>{Number(answer?.rate || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Possible winning:</span>
                        <span>
                          {(
                            Number(answer.rate || 0) * Number(state.amount || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <SubmitButton isSubmitting={false} />
                  </div>
                </div>
              </div>
            </form>
          </BackBox>
        </m.div>
      )}
    </AnimatePresence>
  );
}
