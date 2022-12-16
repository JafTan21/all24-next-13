export interface IUser {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  balance: number;

  club_id: number;
  club_name?: string;

  sponsor_id: number;
  sponsor_username?: string;

  sponsor_rate?: number;

  min_withdraw?: number;
  max_withdraw?: number;

  min_deposit?: number;
  max_deposit?: number;

  is_super: boolean;
  is_active: boolean;
  can_transfer_balance: boolean;

  joined_club_at: string;
}
