import { IUser } from "./User";

export interface IBalanceTransfer {
  id: number;

  from: IUser;
  to: IUser;

  type?: string;

  amount: number;
  status: number;

  created_at: string;
}
