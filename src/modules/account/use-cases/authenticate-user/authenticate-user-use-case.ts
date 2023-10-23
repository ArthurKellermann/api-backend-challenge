import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../../repositories/users-repository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { auth } from '../../../../config/auth';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ email, password }: AuthenticateUserRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: '10m',
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}
