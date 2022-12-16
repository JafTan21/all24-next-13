export interface IPaymentMethod {
  name: string;
  number: string;
  image?: string;
  id: number;
  action_by_email: string;
  deleted_at: string;
  action: string;
}
