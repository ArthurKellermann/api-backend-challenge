import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { User } from '../../entities/user';
import { hash } from 'bcryptjs';
import { AppError } from '../../../../shared/infra/errors/app-error';

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
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      balance,
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}
