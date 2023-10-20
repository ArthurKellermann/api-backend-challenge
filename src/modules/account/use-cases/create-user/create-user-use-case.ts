import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  balance: number;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('PrismaUsersRepository') private usersRepository: UsersRepository,
  ) {}

  async execute({
    balance,
    email,
    name,
    password,
  }: CreateUserRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.create({
      balance,
      email,
      name,
      password,
    });

    return user;
  }
}
