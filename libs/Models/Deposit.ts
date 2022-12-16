export interface IDeposit {
  user_id: number;
  username: string;
  amount: number;
  from: string;
  to: string;
  method: string;
  transaction_number: string;
  status_text: string;
  status: number;
  id: number;
  date: string;
}
