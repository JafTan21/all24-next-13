"use client";

import { createContext } from "react";
import { IAnswer } from "../../../libs/Models/Answer";
import { IGame } from "../../../libs/Models/Game";
import { IQuestion } from "../../../libs/Models/Question";

export interface IMultibet {
  game: IGame;
  question: IQuestion;
  answer: IAnswer;
}

export const MultibetContext = createContext<{
  betsForMultibet: IMultibet[];
  betsForMultibetSet: (multibets: IMultibet[]) => void;
}>({
  betsForMultibet: [],
  betsForMultibetSet: (x: IMultibet[]) => {},
});
