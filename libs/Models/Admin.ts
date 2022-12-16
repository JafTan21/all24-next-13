export interface IAdmin {
  id: number;
  email: string;
  phone: string;

  admin_type: number;
  admin_type_text: string;

  is_active: boolean;
}
