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

  total_limit: number;
}
