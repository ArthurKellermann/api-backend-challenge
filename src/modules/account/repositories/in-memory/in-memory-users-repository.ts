import { CreateUserDto } from '../../dtos/create-user-dto';
import { User } from '../../entities/user';
import { randomUUID } from 'crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create({
    name,
    email,
    password,
    balance,
  }: CreateUserDto): Promise<User> {
    const revenue = new User();

    Object.assign(revenue, {
      id: randomUUID(),
      name,
      email,
      password,
      balance,
    });

    this.users.push(revenue);

    return revenue;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}
