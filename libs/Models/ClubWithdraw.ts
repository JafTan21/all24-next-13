export interface IClubWithdraw {
  club_id: number;
  club_name: string;

  super_id: string; // username

  amount: number;
  method: string;

  status: number;
  status_text: string;

  id: number;
  date: string;
}
