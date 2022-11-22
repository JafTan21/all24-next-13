export interface IBet {
  id: number;
  //   user_id: number;
  answer_id: number;
  question_id: number;
  game_id: number;

  username: string;
  answer: string;
  question: string;
  game: string;
  short_description: string;

  amount: number;
  rate: number;
  possible_return: number;

  returned_rate: number;
  returned_amount: number;

  refund_rate: number;
  refund_amount: number;

  cashout_rate: number;
  cashout_amount: number;
  possible_cash_out_rate: number;

  status: number;
  status_text: string;

  action_by: string;
  date: string;
}
