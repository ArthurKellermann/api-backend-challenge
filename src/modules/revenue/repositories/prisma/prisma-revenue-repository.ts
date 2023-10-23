import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../revenue-repository';
import { CreateRevenueDto } from '../../dtos/create-revenue-dto';
import { Revenue } from '../../entities/revenue';
import { UpdateRevenueDto } from '../../dtos/update-revenue-dto';

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

  async list(user_id: string): Promise<Revenue[]> {
    const revenues = await this.prismaClient.revenue.findMany({
      where: {
        user_id: user_id,
      },
    });

    return revenues;
  }

  async updateById({
    id,
    amount,
    description,
  }: UpdateRevenueDto): Promise<Revenue> {
    const revenue = await this.prismaClient.revenue.update({
      data: {
        amount,
        description,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });

    return revenue;
  }

  async findById(id: string): Promise<Revenue> {
    const revenue = await this.prismaClient.revenue.findUnique({
      where: {
        id,
      },
    });

    return revenue;
  }

  async getTotalRevenueAmount(user_id: string): Promise<number> {
    const revenues = await this.list(user_id);
    let amount: number = 0;

    revenues.forEach((revenue) => {
      amount += revenue.amount;
    });

    return amount;
  }
}
