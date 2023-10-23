import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ExpenseRepository } from '../expense-repository';
import { CreateExpenseDto } from '../../dtos/create-expense-dto';
import { UpdateExpenseDto } from '../../dtos/update-expense-dto';
import { Expense } from '../../entities/expense';

@injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(@inject('PrismaClient') private prismaClient: PrismaClient) {}
  async create({
    amount,
    description,
    title,
    user_id,
  }: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prismaClient.expense.create({
      data: { amount, description, title, user_id },
    });

    return expense;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaClient.expense.delete({
      where: {
        id,
      },
    });
  }

  async list(user_id: string): Promise<Expense[]> {
    const expenses = await this.prismaClient.expense.findMany({
      where: {
        user_id: user_id,
      },
    });

    return expenses;
  }

  async updateById({
    id,
    amount,
    description,
  }: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.prismaClient.expense.update({
      data: {
        amount,
        description,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });

    return expense;
  }

  async findById(id: string): Promise<Expense> {
    const expense = await this.prismaClient.expense.findUnique({
      where: {
        id,
      },
    });

    return expense;
  }

  async getTotalExpenseAmount(user_id: string): Promise<number> {
    const expense = await this.list(user_id);
    let amount: number = 0;

    expense.forEach((expense) => {
      amount += expense.amount;
    });

    return amount;
  }
}
