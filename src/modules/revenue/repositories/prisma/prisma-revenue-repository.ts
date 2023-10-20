import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../revenue-repository';
import { CreateRevenueDto } from '../../dtos/create-revenue-dto';
import { Revenue } from '../../entities/revenue';

@injectable()
export class PrismaRevenueRepository implements RevenueRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}
  async create({
    amount,
    description,
    title,
    user_id,
  }: CreateRevenueDto): Promise<Revenue> {
    const revenue = await this.prismaClient.revenue.create({
      data: { amount, description, title, user_id },
    });

    return revenue;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.revenue.delete({
      where: {
        id,
      },
    });
  }

  async list(): Promise<Revenue[]> {
    const revenues = await this.prismaClient.revenue.findMany();

    return revenues;
  }
}
