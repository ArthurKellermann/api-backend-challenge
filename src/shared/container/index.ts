import { container } from 'tsyringe';
import { prismaClient } from '../infra/database/prisma/prisma-cllient';
import { UsersRepository } from '../../modules/account/repositories/users-repository';
import { PrismaUsersRepository } from '../../modules/account/repositories/prisma/prisma-users-repository';

container.registerInstance('PrismaClient', prismaClient);

container.registerSingleton<UsersRepository>(
  'PrismaUsersRepository',
  PrismaUsersRepository,
);
