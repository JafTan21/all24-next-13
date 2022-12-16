import { IAnswer } from "./Answer";
import { IGame } from "./Game";
import { IQuestion } from "./Question";
import { IUser } from "./User";

export interface IMultibet {
  id: number;

  username: string;

  multibet_games: IMultibetGame[];

  rate: number;
  amount: number;
  status_text: string;
  status: number;

  date: string;
}

interface IMultibetGame {
  id: number;
  answer: IAnswer;
  question: IQuestion;
  game: IGame;
  user: IUser;
  status: number;
  answer_rate: number;
}
