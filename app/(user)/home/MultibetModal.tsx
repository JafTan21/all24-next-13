import React, { useContext, useState } from "react";
import SubmitButton from "../../../components/Html/SubmitButton";
import BackBox from "../../../components/Html/BackBox";

import { motion as m, AnimatePresence } from "framer-motion";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import Image from "next/image";
import { successNotification } from "../../../utils/helpers/NotificationHelper";
import AppConfig from "../../../app.config";
import { MultibetContext } from "./Multibet";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface Props {
  show: boolean;
  showSet: (show: boolean) => void;
}

export default function MultibetModal({ show, showSet }: Props) {
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
    resetOnResolve: true,
    submitAfter: AppConfig.waiting_time,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios
            .post("/user/multibet", {
              answerIds: betsForMultibet.map((bet) => bet.answer.id),
              amount: state.amount,
            })
            .then((res) => {
              successNotification(res.data?.message);

              betsForMultibetSet([]);
              showSet(false);
              resolve(res.data);
            })
            .catch(reject);
        }, AppConfig.waiting_time);
      });
    },
  });

  const { betsForMultibet, betsForMultibetSet } = useContext(MultibetContext);
  const remove = (answer_id: number) => {
    betsForMultibetSet([
      ...betsForMultibet.filter((bet) => bet.answer.id != answer_id),
    ]);
  };

  const rate = betsForMultibet
    .map((bet) => bet.answer.rate)
    .reduce((prev, curr) => {
      return prev + curr;
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
          className="fixed top-0 left-0 right-0 w-screen h-screen"
        >
          <BackBox
            title="Place Multi-Bet"
            className="bg-gray-300 shadow-lg fixed left-0 right-0"
            onBackButtonClick={() => showSet(false)}
          >
            <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
              <div className="w-full bg-white border ">
                <div className="px-2 py-1">
                  <div
                    style={{ wordBreak: "break-word" }}
                    className="max-h-[250px] overflow-scroll"
                  >
                    {Object.values(betsForMultibet).map(
                      ({ answer, question, game }) => {
                        return (
                          <div className="border p-2 my-1">
                            <div className="flex items-center">
                              <Image
                                alt={game.game_type.name}
                                src={game.game_type.img}
                                height="40"
                                width="40"
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
                                  <span className="ml-1">
                                    {game?.starting_time}
                                  </span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => remove(answer.id)}
                                className="px-2 text-white bg-red-600 rounded-full"
                              >
                                X
                              </button>
                            </div>
                            <div className="px-3 py-1 font-bold rounded">
                              <div className="flex flex-wrap items-center text-gray-700">
                                Qs:
                                <span className="ml-1">
                                  {question.question}
                                </span>
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
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="flex mt-0.5">
                    <button
                      type="button"
                      className="bg-gray-200 py-2 px-2 rounded-l border-gray-400 border-b border-t border-l"
                      disabled={state.amount <= 20}
                      onClick={() => {
                        if (state.amount < 20) return;
                        updateState({ amount: state.amount - 20 });
                      }}
                    >
                      <AiOutlineMinus />
                    </button>
                    <input
                      type="number"
                      placeholder="Bet amount"
                      className="border-gray-400 border-b border-t bg-white px-4 py-1 text-gray-900 outline-none w-full focus:ring-2 focus:ring-indigo-400"
                      value={state.amount || ""}
                      name="amount"
                      onChange={onChange}
                      required={true}
                    />
                    <button
                      type="button"
                      className="bg-gray-200 py-2 px-2 rounded-r border-gray-400 border-b border-t border-r"
                      onClick={() => updateState({ amount: state.amount + 20 })}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    {[20, 100, 500, 1000, 2000, 5000].map((num) => {
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
                      <span>{rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Possible winning:</span>
                      <span>
                        {(Number(rate) * Number(state.amount || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <SubmitButton isSubmitting={isSubmitting} />
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
