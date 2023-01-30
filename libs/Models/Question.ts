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

  bets_count?: number;
  multibets_count?: number;

  bets_amount?: number;
  possible_return?: number;

  //
  cashout_amount?: number;
  refund_amount?: number;
  //

  answers: {
    [id: number]: IAnswer;
  };
}
