import { IAnswer } from "./Answer";

export interface IQuestion {
  id: number;
  game_id: number;

  question: string;
  starting_time: string;
  ending_time: string;

  can_bet: boolean;
  show_to_users: boolean;
  is_area_hidden: boolean;

  status: number;

  total_limit: number;
  added_by_email: string;

  answers: {
    [id: number]: IAnswer;
  };
}
