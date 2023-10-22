import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../../dtos/create-user-dto';
import { User } from '../../entities/user';
import { UsersRepository } from '../users-repository';
import { inject, injectable } from 'tsyringe';
import { UpdateUserBalanceDto } from '../../dtos/update-user-balance-dto';

@injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}

  async create({
    name,
    email,
    password,
    balance,
  }: CreateUserDto): Promise<User> {
    const user = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password,
        balance,
        created_at: new Date(),
        updated_at: new Date(),
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
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async updateBalance({ balance, id }: UpdateUserBalanceDto): Promise<number> {
    const user = await this.prismaClient.user.update({
      data: {
        balance,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });

    return user.balance;
  }
}
