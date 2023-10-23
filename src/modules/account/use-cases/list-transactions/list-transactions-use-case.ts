import { inject, injectable } from 'tsyringe';
import { RevenueRepository } from '../../../revenue/repositories/revenue-repository';
import { ExpenseRepository } from '../../../expense/repositories/expense-repository';
import { Expense } from '../../../expense/entities/expense';
import { Revenue } from '../../../revenue/entities/revenue';

interface ListTransactionsResponse {
  expenses: Expense[];
  revenues: Revenue[];
}

@injectable()
export class ListTransactionsUseCase {
  constructor(
    @inject('PrismaRevenueRepository')
    private readonly revenueRepository: RevenueRepository,
    @inject('PrismaExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async execute(user_id: string): Promise<ListTransactionsResponse> {
    const expenses = await this.expenseRepository.list(user_id);
    const revenues = await this.revenueRepository.list(user_id);

    return { expenses, revenues };
  }
}
