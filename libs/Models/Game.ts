import { IQuestion } from "./Question";

export interface IGame {
  game_type: {
    id: number;
    img: string;
    name: string;
  };
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
  game_break_time_status: number;

  questions: {
    [id: number]: IQuestion;
  };
}
