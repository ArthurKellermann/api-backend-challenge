import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserBalanceDto } from '../dtos/update-user-balance-dto';
import { User } from '../entities/user';

export interface UsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updateBalance(data: UpdateUserBalanceDto): Promise<number>;
}
