import { IQuestion } from "./Question";

export interface IGameType {
  id: number;
  img: string;
  name: string;
}

export interface IGame {
  game_type: IGameType;
  id: number;

  game_type_id: number;
  team1: string;
  team2: string;
  starting_time: string;
  ending_time: string;
  live_score: string;

  status: number;

  can_bet: boolean;
  show_to_users: boolean;
  is_area_hidden: boolean;
  is_hidden: boolean;

  short_description: string;
  added_by_email: string;

  total_limit: number;

  game_break_time: number;
  game_break_time_status: boolean;

  total_questions_count?: number;
  total_answers_count?: number;

  closed_on?: string;

  bets_count?: number;
  multibets_count?: number;

  bets_amount?: number;
  possible_return?: number;

  questions_count?: number;
  answers_count?: number;

  youtube_embed_link?: string;
  youtube_embed_on: boolean;

  //
  cashout_amount?: number;
  refund_amount?: number;
  //

  questions: {
    [id: number]: IQuestion;
  };
}
