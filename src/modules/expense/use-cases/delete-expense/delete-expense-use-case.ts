import { inject, injectable } from 'tsyringe';
import { ExpenseRepository } from '../../repositories/expense-repository';
import { UsersRepository } from '../../../account/repositories/users-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';

interface DeleteExpenseRequest {
  expense_id: string;
  user_id: string;
}

@injectable()
export class DeleteExpenseUseCase {
  constructor(
    @inject('PrismaExpenseRepository')
    private readonly expenseRepository: ExpenseRepository,
    @inject('PrismaUsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    expense_id,
    user_id,
  }: DeleteExpenseRequest): Promise<number> {
    const user = await this.usersRepository.findById(user_id);
    const expense = await this.expenseRepository.findById(expense_id);

    if (!expense) {
      throw new AppError('Expense does not exists');
    }

    user.balance += expense.amount;

    await this.usersRepository.updateBalance({
      balance: user.balance,
      id: user.id,
    });

    await this.expenseRepository.deleteById(expense_id);

    return user.balance;
  }
}
