import { inject, injectable } from 'tsyringe';
import { ExpenseRepository } from '../../repositories/expense-repository';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';
import { Expense } from '../../entities/expense';

@injectable()
export class ListExpensesUseCase {
  constructor(
    @inject('PrismaExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: DateProvider,
  ) {}

  async execute(user_id: string): Promise<Expense[]> {
    const expense = await this.expenseRepository.list(user_id);

    return expense.sort((a, b) => {
      return this.dateProvider.compareDate(a.created_at, b.created_at);
    });
  }
}
