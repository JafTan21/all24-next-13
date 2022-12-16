export interface IClub {
  name: string;
  balance: number;
  commission_rate?: number;

  owner_email: string;
  owner_phone: string;
  owner_name: string;

  min_withdraw?: number;
  max_withdraw?: number;

  id: number;

  is_active: boolean;
  is_super: boolean;

  owner_id?: number; // created by
  club_opening_limit?: number;

  //
  users_count?: number;
  users_sum_balance?: number;
}
