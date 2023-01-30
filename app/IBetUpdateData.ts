export interface IBetUpdateData {
  answer_id: number;
  question_id: number;
  game_id: number;

  bet_add_amount: number;
  bet_add_count: number;

  bet_add_possible_return: number;
  bet_add_cashout_amount: number;
  bet_add_refund_amount: number;

  multibet_add_count: number;
}
