import 'reflect-metadata';
import { container } from 'tsyringe';
import { prismaClient } from '../infra/database/prisma/prisma-cllient';
import { UsersRepository } from '../../modules/account/repositories/users-repository';
import { PrismaUsersRepository } from '../../modules/account/repositories/prisma/prisma-users-repository';
import { RevenueRepository } from '../../modules/revenue/repositories/revenue-repository';
import { PrismaRevenueRepository } from '../../modules/revenue/repositories/prisma/prisma-revenue-repository';

container.registerInstance('PrismaClient', prismaClient);

container.registerSingleton<UsersRepository>(
  'PrismaUsersRepository',
  PrismaUsersRepository,
);

container.registerSingleton<RevenueRepository>(
  'PrismaRevenueRepository',
  PrismaRevenueRepository,
);
