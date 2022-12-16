export interface IWithdraw {
  user_id: number;
  username: string;

  amount: number;
  to: string;
  method: string;
  status: number;
  status_text: string;
  id: number;
  date: string;
}
