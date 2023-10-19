import { container } from 'tsyringe';
import { prismaClient } from '../infra/database/prisma/prisma-cllient';

container.registerInstance('PrismaClient', prismaClient);
