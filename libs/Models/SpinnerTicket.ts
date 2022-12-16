export interface ISpinnerTicket {
  id: number;

  amount: number;
  rate: number;
  possible_return: number;
  name: string;
  win_name: string;
  status: number;
  user_id: number;

  username?: string;

  date: string;
}
