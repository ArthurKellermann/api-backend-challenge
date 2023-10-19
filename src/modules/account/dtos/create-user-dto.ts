export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  balance: number;
  updated_at: Date;
  created_at: Date;
}
