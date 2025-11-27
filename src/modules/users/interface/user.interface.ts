export interface IRegisterUser {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: number;
  phone_number?: string;
  department?: string;
  created_by?: number;
  updated_by?: number;
}