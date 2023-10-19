import { CreateUserDto } from '../dtos/create-user-dto';
import { User } from '../entities/user';

export interface UsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
