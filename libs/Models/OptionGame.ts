import { IUser } from "./User";

export interface IOptionGame {
  id: number;

  user: IUser;

  game_name: string;
  user_id: number;
  selected_option: string;
  winning_option: string;

  amount: number;
  rate: number;
  possible_return: number;

  status: number;

  created_at: string;
}
