import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';

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

  async execute({ balance, email, name, password }: CreateUserRequest) {
    const user = await this.usersRepository.create({
      balance,
      email,
      name,
      password,
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }
}
