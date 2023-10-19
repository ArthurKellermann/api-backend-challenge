import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../../dtos/create-user-dto';
import { User } from '../../entities/user';
import { UserRepository } from '../user-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create({
    name,
    email,
    password,
    balance,
    created_at,
    updated_at,
  }: CreateUserDto): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password,
        balance,
        created_at,
        updated_at,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('User does not exists');
    }

    return user;
  }
}
