export interface IAnswer {
  id: number;
  question_id: number;
  game_id: number;

  answer: string;
  rate: number;
  max_bet: number;
  min_bet: number;
  starting_time: string;
  ending_time: string;

  result_by_email: string;
  added_by_email: string;

  show_to_users: boolean;
  can_bet: boolean;
  status: number;

  cashout_rate: number;

  bets_count?: number;
  multibets_count?: number;

  bets_amount?: number;
  possible_return?: number;

  cashout_amount?: number;
  refund_amount?: number;

  total_limit: number;
}
